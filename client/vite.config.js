module.exports = {
    // ...
    build: {
      rollupOptions: {
        input: 'script.js',
        output: {
          globals: {
            'process.env.API_URL': JSON.stringify(process.env.VITE_API_URL),
          },
        },
      },
    },
  };