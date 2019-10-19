module.exports = {
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env":      {
    "browser": true,
    "node":    true,
    "es6":     true
  },
  "plugins":  [
    "react"
  ],
  "extends":  [
    "airbnb"
  ],
  "parser":   "babel-eslint",
  "rules":    {
    "camelcase": 0,
    "no-console": 0,
    "key-spacing":                  0,
    "no-bitwise":                   [2, {
      "allow": [">>", "&"]
    }],
    "object-curly-spacing":         [2, "never"],
    "object-curly-newline":         [2, {
      "ObjectExpression":  {
        "multiline":  true,
        "consistent": true
      },
      "ObjectPattern":     {
        "multiline":  true,
        "consistent": true
      },
      "ImportDeclaration": "never",
      "ExportDeclaration": {
        "multiline":     true,
        "minProperties": 2,
        "consistent":    true
      }
    }],
    "no-plusplus": [2, {
      "allowForLoopAfterthoughts": true
    }],
    "react/destructuring-assignment": 0,
    "react/state-in-constructor": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-tag-spacing":        [2, {
      "closingSlash":      "never",
      "beforeSelfClosing": "never",
      "afterOpening":      "never",
      "beforeClosing":     "never"
    }],
    "react/sort-comp": [1, {
      order: [
        'lifecycle',
        'static-methods',
        'everything-else',
        'render',
      ]
    }],
  }
};