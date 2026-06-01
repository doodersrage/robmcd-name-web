import { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Python', value: 'python' },
        { label: 'Go', value: 'go' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'C++', value: 'cpp' },
        { label: 'PHP', value: 'php' },
        { label: 'Shell', value: 'shell' },
        { label: 'SQL', value: 'sql' },
      ],
      required: true,
    },
    {
      name: 'code',
      type: 'code', // Built-in Payload code editor field
      required: true,
    },
  ],
}
