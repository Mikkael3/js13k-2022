import {defineConfig} from "vite"
import {viteSingleFile} from "vite-plugin-singlefile"

export default defineConfig({
        plugins: [viteSingleFile()],
        build: {
            minify: 'terser',
            // module: true,
            terserOptions: {
                // toplevel: true,
                // mangle: {
                //     properties: true,
                // }
            }
        }
    }
)
