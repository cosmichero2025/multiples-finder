module.exports = {
    entry: ['./src/app.js'],
    module: {
      rules: [{
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [{
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'fast-sass-loader',
              options: {
                includePaths: [
                  './styles/'
                ]
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './public'
    }
  };
  