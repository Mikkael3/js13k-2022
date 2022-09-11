export default {
    build: {
        minify: 'terser',
        module: true,
        terserOptions: {
            toplevel: true,
            mangle: {
                properties: true,
            }
        }
    }
}
