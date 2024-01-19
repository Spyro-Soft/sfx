import { getProjects, ProjectConfiguration, Tree } from '@nx/devkit';
import { execSync } from 'child_process';
const inquirer = require('inquirer');
import * as path from 'path';

import { TYPE_TAGS } from '../../tags-config';
import { groupingLibrariesQuestion, IGroupLibraries } from './questions';
import { GROUPING_TYPE } from './schema';

interface CheckedLib {
  name: string;
  checked: boolean;
}

interface GroupedLibs {
  tag: string;
  libs: string[];
}
export async function groupGenerator(tree: Tree) {
  const projects = getProjects(tree);
  const projectsNames = Array.from(projects.keys());
  const questions = groupingLibrariesQuestion(projectsNames);
  const answers = await inquirer.prompt(questions);
  switch (answers.groupType) {
    case GROUPING_TYPE.libType: {
      groupAndMoveLibs(answers, projects);
      break;
    }
    case GROUPING_TYPE.custom: {
      moveLibsToCustomDirectoryName(answers);
      break;
    }
  }
}

function groupAndMoveLibs(answers: IGroupLibraries, projects: Map<string, ProjectConfiguration>): void {
  const groupingFolderPath = answers.groupLocationChoice ? answers.groupFolderPath : 'libs/';
  const groupedLibs = groupLibsByType(answers, projects);
  moveLibs(groupedLibs, groupingFolderPath);
}

function groupLibsByType(answers: IGroupLibraries, projects: Map<string, ProjectConfiguration>): GroupedLibs[] {
  const groupedLibs = Object.values(TYPE_TAGS).map((tag) => {
    return {
      tag: getLibType(tag),
      libs: geLibsOfProject(projects, tag),
    };
  });

  return groupedLibs;
}

function moveLibs(groups: GroupedLibs[], groupingFolderPath: string) {
  groups.forEach((group) => {
    group.libs.forEach((lib) => {
      const newPath = path.join(groupingFolderPath, group.tag, lib);
      execSync(`nx g move --project=${lib} --destination=${newPath} --projectNameAndRootFormat=as-provided`);
    });
  });
}

function moveLibsToCustomDirectoryName(answers: IGroupLibraries): void {
  answers.selectedLibraries.forEach((lib: CheckedLib) => {
    const newPath = path.join(answers.groupFolderPath, lib.name);
    execSync(`nx g move --project=${lib} --destination=${newPath} --projectNameAndRootFormat=as-provided`);
  });
}

function getLibType(tag: TYPE_TAGS): string {
  const libType = tag.replace('type:', '');

  return libType;
}

function geLibsOfProject(projects: Map<string, ProjectConfiguration>, tag: TYPE_TAGS): string[] {
  return Array.from(projects.entries())
    .filter(([, value]) => value.tags?.includes(tag))
    .map(([key]) => key);
}

export default groupGenerator;
