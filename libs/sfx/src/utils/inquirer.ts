import inquirer, { Answers, QuestionCollection } from 'inquirer';

export function runInquirerAndProcessAnswers<T extends Answers>(
  questions: QuestionCollection<T>,
  callback: (answers: T, verbose: boolean) => void,
  verbose = false
): Promise<void> {
  return inquirer.prompt(questions).then((answers) => callback(answers, verbose));
}
