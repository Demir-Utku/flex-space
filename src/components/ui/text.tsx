import { Text as RadixText, type TextProps as RadixTextProps } from '@radix-ui/themes'

export function Text({ children, ...props }: RadixTextProps) {
  return (
    <RadixText as="p" {...props}>
      {children}
    </RadixText>
  )
}

export type TextProps = RadixTextProps
