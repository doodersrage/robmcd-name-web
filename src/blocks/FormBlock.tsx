import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock', // The identifier used in your frontend
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms', // Points to the collection created by the Form Builder plugin
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Show Intro Text',
    },
  ],
}
