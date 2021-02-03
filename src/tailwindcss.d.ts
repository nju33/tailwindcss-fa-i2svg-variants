declare module 'tailwindcss/plugin' {
  export type AddVariant = (
    name: string,
    callback: (utilities: {
      modifySelectors: (
        callback: (utilities: { className: string }) => string
      ) => void
      separator: string
    }) => void
  ) => void

  export interface Callback {
    (utilities: { addVariant: AddVariant; e: (str: string) => string })
  }

  function plugin(callback: Callback): void

  export = plugin
}

declare module 'tailwindcss/defaultConfig' {
  interface Config {
    theme: {
      colors: Record<string, Record<string, string>>
    }
  }
  const defaultConfig: Config

  export = defaultConfig
}
