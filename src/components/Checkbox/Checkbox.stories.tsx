import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta = {
    title: 'Checkbox',
    component: Checkbox,
    // tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {

    }
}

export const Checked: Story = {
    args: {

    }
}

export const Indeterminate: Story = {
    args: {
        indeterminate: true
    }
}
