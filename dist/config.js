import fs from 'fs';
const CONFIG_PATH = './.minee.json';
function loadConfig() {
    const defaultConfig = {
        entry: undefined,
        dest: undefined,
        header: true,
        minify: true,
        keepNames: false
    };
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
        return Object.assign(Object.assign({}, defaultConfig), config);
    }
    catch (err) {
        return defaultConfig;
    }
}
export { loadConfig };
