import { watch, existsSync, writeFileSync, readdirSync, statSync } from 'fs'; 
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


// Modificar para cambiar los lenguages vvvvvvvvvvvvvvvvvvvvvvvvvvv
const scriptsLanguageExtension = 'tsx'
const stylesLanguageExtension = 'scss'
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = join(__dirname, 'src', 'components');


const isUpperCase = character => character === character.toUpperCase();    

const createClassName = fileName => {
    let className = '';
    for (let i = 0; i < fileName.length; i++) {
        const character = fileName[i];

        if (isUpperCase(character)) {
            className += `-${character.toLowerCase()}`;
        } else {
            className += character;
        }
    }
    if (className[0] === "-") {
        className = className.substring(1);
    }
    return className;
}

const TsTypesInterface = (filename) => {
    return `
interface ${filename}Types {
    
}
`};

// Contenido para el archivo .jsx/.tsx
const scriptsFileContent = fileName => `
import './${fileName}.scss'
${scriptsLanguageExtension === 'tsx' ? TsTypesInterface(fileName) : ''}
export const ${fileName}${scriptsLanguageExtension === 'tsx' ? `: React.FC<${fileName}Types>` : ''} = () => {
    

    return (
        <div className='${createClassName(fileName)}'>
            
        </div>
    )
}
`.trim();

// Contenido para el archivo .scss
const stylesFileContent = fileName => `
.${createClassName(fileName)} {
    
}
`.trim();



// Función para crear archivos .tsx/.scss si no existen
const createFilesIfNotExist = (folder, filename) => {
    const tsxFile = join(folder, `${filename}.${scriptsLanguageExtension}`);
    const scssFile = join(folder, `${filename}.${stylesLanguageExtension}`);

    if (!existsSync(tsxFile) && !existsSync(scssFile)) {
        writeFileSync(tsxFile, scriptsFileContent(filename), 'utf8');
        writeFileSync(scssFile, stylesFileContent(filename), 'utf8');
        console.log(`${filename}.${scriptsLanguageExtension} y ${filename}.${stylesLanguageExtension} creados.`);
    }
}

// Función para observar todas las carpetas y subcarpetas
const watchAllFolders = folder => {
    // Observar la carpeta actual
    watch(folder, (eventType, filename) => {
        if (eventType === 'rename' && existsSync(join(folder, filename))) {
            const newFolder = join(folder, filename);
            if (statSync(newFolder).isDirectory()) {
                // Si es una nueva carpeta, crear archivos y observarla
                createFilesIfNotExist(newFolder, filename);
                watchAllFolders(newFolder); // Observar la nueva carpeta
            }
        }
    });

    // Leer el contenido de la carpeta
    const items = readdirSync(folder);
    items.forEach(item => {
        const itemPath = join(folder, item);
        if (statSync(itemPath).isDirectory()) {
            watchAllFolders(itemPath); // Observar subcarpetas recursivamente
        }
    });
};

// Iniciar la observación de todas las carpetas y subcarpetas
watchAllFolders(folderPath);