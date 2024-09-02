module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/react',
        'eslint-config-prettier',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: {
        react: { version: '18.2' },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },
    plugins: ['react-refresh', 'import', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            0,
            { allowConstantExport: false },
        ],
        'no-unused-vars': 0,
        'react/jsx-key': 0,
        'prettier/prettier': ['error'], // Ensure this works by adding the plugin
        'import/extensions': [
            'error',
            'always',
            {
                js: 'always',
                jsx: 'always',
                json: 'always',
            },
        ],
    },
};
