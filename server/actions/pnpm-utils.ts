import { executeCommandSimple } from './execute-command';

const ansiRegex = (): RegExp => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|');

  return new RegExp(pattern, 'g');
};

export const executePnpmOutdated = async (
  outdatedInfo: any,
  projectPath: string,
  compatible = false,
): Promise<void> => {
  try {
    await executeCommandSimple(
      projectPath,
      `pnpm outdated ${compatible ? '--compatible' : ''} --no-table`,
    );
  } catch (error: unknown) {
    if (typeof error === 'string') {
      const rows = error.replace(ansiRegex(), '').split('\n');
      let name = '';
      for (const row of rows) {
        // eslint-disable-next-line no-div-regex
        const rowResult = /=>.([\d.]+)/.exec(row);
        if (rowResult) {
          outdatedInfo[name] = {
            ...outdatedInfo[name],
            [compatible ? 'wanted' : 'latest']: rowResult[1],
          };
        } else {
          name = row.replace('(dev)', '').trim();
        }
      }
    }
  }
};
