import getFileNames from '../getFileNames';

test('Remove file extension from file names', () => {
  const demoFilename = 'index.ts';
  const fileName = getFileNames([demoFilename]);

  expect(fileName).toContain(demoFilename.replace('.ts', ''));
});
