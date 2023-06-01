module.exports = {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
        "<rootDir>/setup-jest.ts"
    ],
    "transformIgnorePatterns": ['node_modules/(?!@angular|@ngx-translate)'],
    "transform": {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular'
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/cypress/",
        "<rootDir>/src/test.ts",
    ]
};