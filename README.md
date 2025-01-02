# @elizaos/plugin-near Documentation

## Overview
### Propósito
El paquete @elizaos/plugin-near tiene como propósito principal proporcionar funcionalidades relacionadas con la transferencia de tokens NEAR, verificación de saldos de almacenamiento, intercambio de tokens, y validación de configuraciones NEAR.

### Características Clave
- Función para verificar el saldo de almacenamiento de un contrato.
- Función para intercambiar tokens de manera asíncrona.
- Validación de contenido de transferencia.
- Función para transferir NEAR de manera asíncrona.
- Obtener la configuración basada en el entorno proporcionado.
- Validación de la configuración de Near.

[Liste las características clave con descripciones breves]

## Installation
# Instrucciones de instalación e integración para el plugin @elizaos/plugin-near

### Paso 1: Agregar el plugin a tu proyecto ElizaOS
1. Agrega lo siguiente a las dependencias de tu archivo agent/package.json:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. Accede al directorio agent/
3. Ejecuta `pnpm install` para instalar la nueva dependencia
4. Ejecuta `pnpm build` para construir el proyecto con el nuevo plugin

### Paso 2: Importar y usar el plugin
- Utiliza la siguiente sintaxis de importación: `import { nearPlugin } from "@elizaos/plugin-near";`
- Añade el plugin al array de plugins de AgentRuntime

### Paso 3: Ejemplo de integración con la configuración completa
```typescript
import { nearPlugin } from "@elizaos/plugin-near";

return new AgentRuntime({
    // otra configuración...
    plugins: [
        nearPlugin,
        // otros plugins...
    ],
});
```

### Paso 4: Pasos de verificación para asegurar una integración exitosa
- Verifica que aparezca ["✓ Registro de acción: <acciones del plugin>"] en la consola

Recuerda que este es un paquete de espacio de trabajo que necesita ser añadido al archivo agent/package.json y después construido. ¡Disfruta de tu nuevo plugin de Near Protocol para Eliza! 🚀

## Configuration
# Documentación de Configuración

La configuración de la aplicación se realiza a través del archivo `.env`. Asegúrate de que el archivo `.env` esté incluido en el archivo `.gitignore` para que no se comprometa en el repositorio.

## Variables de Entorno Requeridas

- `NEAR_ENV`: Utilizado como variable de entorno para el entorno NEAR.
- `REACT_APP_REF_SDK_ENV`: Utilizado como variable de entorno para el entorno SDK REF de React.
- `NEAR_WALLET_SECRET_KEY`: Llave secreta del monedero NEAR.
- `NEAR_WALLET_PUBLIC_KEY`: Llave pública del monedero NEAR.
- `NEAR_ADDRESS`: Dirección NEAR utilizada por la aplicación.
- `SLIPPAGE`: Deslizamiento utilizado en la configuración de la aplicación.
- `RPC_URL`: URL del proveedor de servicios RPC.
- `NEAR_NETWORK`: Red NEAR utilizada.
- ...

## Ejemplo de Archivo .env

```plaintext
NEAR_ENV=production
REACT_APP_REF_SDK_ENV=development
NEAR_WALLET_SECRET_KEY=your_secret_key
NEAR_WALLET_PUBLIC_KEY=your_public_key
NEAR_ADDRESS=your_near_address
SLIPPAGE=0.5
RPC_URL=https://your_rpc_url.com
NEAR_NETWORK=testnet
```

Asegúrate de completar todas las variables requeridas de acuerdo a tu configuración.

Recuerda mantener seguro el contenido de tu archivo `.env` para proteger tus claves y datos sensibles.

## Features

### Actions
### [Ejecutar intercambio NEAR]

Realiza un intercambio de tokens utilizando Ref Finance.

#### Propiedades
- Nombre: EJECUTAR_INTERCAMBIO_NEAR
- Similitudes: 
   - SWAP_TOKENS_NEAR
   - TOKEN_SWAP_NEAR
   - TRADE_TOKENS_NEAR
   - EXCHANGE_TOKENS_NEAR

#### Handler
El manejador primero inicializa el SDK de Ref con el entorno de la red de pruebas y luego ejecuta el intercambio de tokens utilizando los parámetros proporcionados.

#### Ejemplos
[
    [
        {
            user: "Usuario",
            content: {
                inputTokenId: "wrap.testnet",
                outputTokenId: "ref.fakes.testnet",
                amount: "1.0",
            },
        },
        {
            user: "Agente",
            content: {
                text: "Intercambiando 1.0 NEAR por REF...",
                action: "TOKEN_SWAP",
            },
        },
        {
            user: "Agente",
            content: {
                text: "¡Intercambio completado con éxito! Hash de transacción: ...",
            },
        },
    ],
]

### [action name]
Transferencia de NEAR

#### Propiedades
- Nombre: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
El handler se encarga de transferir tokens NEAR a otra cuenta.

#### Ejemplos
[
    [
        {
            user: "Usuario",
            content: {
                text: "Enviar 1.5 NEAR a bob.testnet",
            },
        },
        {
            user: "Agente",
            content: {
                text: "Ahora enviaré 1.5 NEAR...",
                action: "SEND_NEAR",
            },
        },
        {
            user: "Agente",
            content: {
                text: "Se enviaron correctamente 1.5 NEAR a bob.testnet\nTransacción: ABC123XYZ",
            },
        },
    ],
]



### Providers
### Proveedor de Cartera
Proveedor de cartera que permite obtener información sobre el valor de los activos en una cuenta NEAR.

#### Métodos
Enfocado en el método get() y su funcionalidad.

#### Uso
```typescript
const accountId = "mi-cuenta.near";
const provider = new WalletProvider(accountId);
const portfolio = await provider.getFormattedPortfolio(runtime);
console.log(portfolio);
```

El proveedor de cartera permite conectarse a una cuenta NEAR y recuperar información sobre el valor de los activos, incluyendo el precio en USD y el balance en NEAR. Además, ofrece la posibilidad de formatear y mostrar la cartera en un formato legible para el usuario.



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Casos de Uso Comunes
1. Crear una instancia de WalletProvider con un ID de cuenta y obtener información de cartera formateada.
```typescript
const walletProvider = new WalletProvider("cuenta123");
const formattedInfo = await walletProvider.get(runtime, message, state);
```
2. Establecer una conexión con la red NEAR utilizando las credenciales de la billetera y obtener la cuenta de la billetera.
```typescript
const walletProvider = new WalletProvider("cuenta456");
const walletAccount = await walletProvider.connect(runtime);
```

### Mejores Prácticas
- Utilizar el método fetchWithRetry para realizar solicitudes a URL con reintento en caso de error.
- Formatear el portafolio de la cartera utilizando el método formatPortfolio para obtener un resumen legible con información detallada.

### actions/transfer.ts

### Common Use Cases
1. **Verifying if a content is a transfer**: You can use the `isTransferContent` function to check if a certain content is a transfer.
```typescript
const isTransfer = isTransferContent(runtime, content);
if (isTransfer) {
    // Perform actions for transfers
} else {
    // Other actions
}
```

2. **Transferring NEAR tokens**: Use the `transferNEAR` function to transfer NEAR tokens to a recipient.
```typescript
const recipient = "example.near";
const amount = "10";
const transactionHash = await transferNEAR(runtime, recipient, amount);
console.log(`Transaction hash: ${transactionHash}`);
```

### Best Practices
- **Check before transferring**: Always verify if the content is a transfer using `isTransferContent` before proceeding with any transfer actions.
- **Handle errors**: Make sure to handle errors that may occur during the NEAR token transfer process to provide a better user experience.

### environment.ts

### Common Use Cases
1. **Retrieve configuration based on the provided environment:**
```typescript
import { getConfig } from './environment';

// Get configuration for a specific environment
const config = getConfig('development');
console.log(config);
```

2. **Validate Near configuration:**
```typescript
import { validateNearConfig } from './environment';

const runtime = {
  name: 'node',
  version: '12.3.0'
};

validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log('Validated Near configuration:', nearConfig);
  })
  .catch((error) => {
    console.error('Error validating Near configuration:', error);
  });
```

### Best Practices
- **Follow JSDoc conventions:** It is important to adhere to JSDoc conventions for documenting functions and types to ensure clear understanding and maintainability.
- **Use specific environment names:** When using the `getConfig` function, provide specific environment names like 'development' or 'production' instead of generic terms to avoid ambiguity.

### actions/swap.ts

- **Use Case 1: Verificar saldo de almacenamiento**
  
  ```typescript
  const account = 'account123';
  const contractId = 'contract456';
  const hasStorageBalance = await checkStorageBalance(account, contractId);
  console.log(hasStorageBalance);
  ```

- **Use Case 2: Intercambiar tokens**
  
  ```typescript
  const runtime = 'agentRuntime';
  const inputTokenId = 'token123';
  const outputTokenId = 'token456';
  const amount = '100';
  const slippageTolerance = 0.01;
  
  try {
    const transaction = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
    console.log(transaction);
  } catch (error) {
    console.error(error);
  }
  ```

- **Best Practice: Documentar en español**
  
  Es importante mantener la coherencia en el código y en la documentación, por lo que se recomienda seguir las convenciones establecidas en los comentarios JSDoc y escribirlos en español para facilitar la comprensión del código a otros desarrolladores de habla hispana.

- **Best Practice: Manejo de errores**
  
  Al utilizar funciones asíncronas como `checkStorageBalance` y `swapToken`, es recomendable envolver las llamadas a estas funciones en un bloque try-catch para manejar cualquier error que pueda surgir durante la ejecución y evitar que la aplicación se bloquee.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * Proveedor de Cartera que implementa la interfaz Provider
 * @class
 */
**/
```

#### Interfaces

##### NearToken

```
/**
 * Interfaz para representar un token cercano
 * @typedef {Object} NearToken
 * @property {string} name - El nombre del token
 * @property {string} symbol - El símbolo del token
 * @property {number} decimals - El número de decimales del token
 * @property {string} balance - El saldo del token
 * @property {string} uiAmount - La cantidad de la interfaz de usuario del token
 * @property {string} priceUsd - El precio del token en USD
 * @property {string} valueUsd - El valor del token en USD
 * @property {string} [valueNear] - El valor del token en NEAR (opcional)
 */
```

##### WalletPortfolio

```
/**
 * Interfaz que representa el portafolio de una cartera.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - El total en USD en la cartera.
 * @property {string} [totalNear] - El total en NEAR en la cartera (opcional).
 * @property {Array<NearToken>} tokens - La lista de tokens NEAR en la cartera.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor de la clase que inicializa un objeto con un ID de cuenta dado.
 * Además, inicializa un nuevo caché con un tiempo de vida de 5 minutos y un almacén de claves en memoria.
 * 
 * @param {string} accountId - El ID de la cuenta asignado al objeto
 */
```

##### get

```
/**
 * Método asincrónico para obtener información de cartera formateada.
 * @param {IAgentRuntime} runtime - Interfaz que contiene información y funcionalidades del agente en ejecución.
 * @param {Memory} _message - Objeto que representa un mensaje o evento recibido por el agente.
 * @param {State} [_state] - Estado opcional que puede ser proporcionado al método.
 * @returns {Promise<string | null>} Información de cartera formateada o null en caso de error.
 */
```

##### connect

```
/**
 * Método asíncrono para establecer una conexión con la red NEAR utilizando las credenciales de la billetera.
 * 
 * @param {IAgentRuntime} runtime - Instancia de IAgentRuntime
 * @returns {Promise<WalletAccount>} Retorna la cuenta de la billetera una vez establecida la conexión
 * @throws {Error} Error cuando las credenciales de la billetera NEAR no están configuradas
 */
```

##### fetchWithRetry

```
/**
 * Función que realiza una solicitud a un URL con la posibilidad de reintento en caso de error,
 * hasta un máximo de intentos definido en PROVIDER_CONFIG.MAX_RETRIES.
 * 
 * @param {string} url - El URL al que se realizará la solicitud.
 * @param {RequestInit} options - Opciones adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que se resuelve con la respuesta en formato JSON si la solicitud es exitosa.
 * @throws {Error} - Error HTTP si la respuesta no es exitosa después de los reintentos.
 */
```

##### fetchPortfolioValue

```
/**
 * 
 * Método asíncrono para obtener el valor de la cartera.
 * 
 * @param {IAgentRuntime} runtime - Interfaz del tiempo de ejecución del agente.
 * @returns {Promise<WalletPortfolio>} Retorna la cartera del usuario.
 * 
 */
```

##### fetchNearPrice

```
/**
* Método privado asíncrono para obtener el precio cercano.
* @returns {Promise<number>} - El precio cercano en USD.
*/
```

##### formatPortfolio

```
/**
 * Formatea y genera un resumen legible del portafolio, incluyendo la información del sistema del personaje, ID de cuenta, valor total en USD y NEAR, saldos de tokens y precios de mercado.
 * 
 * @param {IAgentRuntime} runtime - La instancia del tiempo de ejecución del agente.
 * @param {WalletPortfolio} portfolio - El portafolio de la billetera que se formateará.
 * @returns {string} Un resumen formateado del portafolio con la información detallada.
 */
           
```

##### getFormattedPortfolio

```
/**
 * Método asincrónico para obtener el portafolio formateado.
 * 
 * @param {IAgentRuntime} runtime - El entorno de ejecución del agente.
 * @returns {Promise<string>} La información del portafolio formateada como cadena.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interfaz para representar la transferencia de contenido, extiende la interfaz Content.
 * 
 * @interface
 * @typedef {Object} TransferContent
 * @property {string} recipient - El destinatario de la transferencia.
 * @property {string | number} amount - La cantidad de tokens a transferir.
 * @property {string} [tokenAddress] - Dirección del token (opcional para transferencias nativas NEAR).
 */
```

#### Functions

##### isTransferContent

```
/**
 * Función para verificar si el contenido es una transferencia.
 * 
 * @param {IAgentRuntime} runtime - El entorno de ejecución del agente.
 * @param {any} content - El contenido a verificar.
 * @returns {boolean} Devuelve verdadero si el contenido es una transferencia, falso en caso contrario.
 */
```

##### transferNEAR

```
/**
 * Función asincrónica para transferir NEAR.
 * 
 * @param {IAgentRuntime} runtime - Objeto de tiempo de ejecución del agente.
 * @param {string} recipient - Dirección del receptor de la transferencia NEAR.
 * @param {string} amount - Cantidad de NEAR a transferir en formato de cadena.
 * @returns {Promise<string>} Promesa que devuelve el hash de la transacción.
 * @throws {Error} Si las credenciales de la billetera NEAR no están configuradas.
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Tipo de dato que representa la configuración de Near.
 */
```

#### Functions

##### getConfig

```
/**
 * Función que devuelve la configuración basada en el entorno proporcionado.
 *
 * @param {string | undefined | null} env - El entorno proporcionado, si no se proporciona se utilizará el valor de ENV, process.env.NEAR_ENV o process.env.REACT_APP_REF_SDK_ENV.
 * @returns {object} - La configuración correspondiente al entorno proporcionado.
 */
```

##### validateNearConfig

```
/**
 * Valida la configuración de Near.
 * 
 * @param {IAgentRuntime} runtime - Entorno de ejecución del agente.
 * @returns {Promise<NearConfig>} - Promesa que resuelve con la configuración de Near validada.
 * @throws {Error} - Error si la validación de la configuración falla.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Función asíncrona para verificar el saldo de almacenamiento de un contrato para una cuenta específica.
 * @param {any} account - La cuenta para la cual se verificará el saldo de almacenamiento.
 * @param {string} contractId - El ID del contrato del cual se verificará el saldo de almacenamiento.
 * @returns {Promise<boolean>} Devuelve un valor booleano que indica si el saldo de almacenamiento es diferente de cero y no es nulo.
 */
```

##### swapToken

```
/**
 * Función asíncrona para intercambiar tokens.
 * 
 * @param {IAgentRuntime} runtime - Entorno de ejecución de Agente
 * @param {string} inputTokenId - ID del token de entrada
 * @param {string} outputTokenId - ID del token de salida
 * @param {string} amount - Cantidad a intercambiar
 * @param {number} slippageTolerance - Tolerancia de deslizamiento (por defecto, 0.01)
 * @returns {Promise<any>} - Promesa que resuelve en una transacción de intercambio o error
 */
```


## Development

### TODO Items
### Items
1. TODO: agregar funcionalidad para admitir múltiples redes
   - Contexto: función asíncrona swapToken(
    runtime: IAgentRuntime,
    inputTokenId: string,
    outputTokenId: string,
    amount: string,
    slippageTolerance: number = Number(
        runtime.getSetting("SLIPPAGE_TOLERANCE")
    ) || 0.01
): Promise<any> {
    try {
        // Obtener metadatos del token
        const tokenIn = await ftGetTokenMetadata(inputTokenId);
        const tokenOut = await ftGetTokenMetadata(outputTokenId);
        const networkId = runtime.getSetting("NEAR_NETWORK") || "testnet";
        const nodeUrl =
            runtime.getSetting("RPC_URL") || "https://rpc.testnet.near.org";

        // Obtener todos los pools para la estimación
        // ratedPools, unRatedPools,
        const { simplePools } = await fetchAllPools();
        const swapTodos = await estimateSwap({
            tokenIn,
            tokenOut,
            amountIn: amount,
            simplePools,
            options: {
                enableSmartRouting: true,
            },
        });

        if (!swapTodos || swapTodos.length === 0) {
            throw new Error("No se encontró una ruta de intercambio válida");
        }

        // Obtener ID de cuenta de la configuración en tiempo de ejecución
        const accountId = runtime.getSetting("NEAR_ADDRESS");
        if (!accountId) {
            throw new Error("NEAR_ADDRESS no está configurado");
        }

        const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
        const keyStore = new keyStores.InMemoryKeyStore();
        const keyPair = utils.KeyPair.fromString(secretKey as KeyPairString);
        await keyStore.setKey(networkId, accountId, keyPair);

        const nearConnection = await connect({
            networkId,
            keyStore,
            nodeUrl,
        });

        const account = await nearConnection.account(accountId);

        // Verificar el saldo de almacenamiento para ambos tokens
        const hasStorageIn = await checkStorageBalance(account, inputTokenId);
        const hasStorageOut = await checkStorageBalance(account, outputTokenId);

        const transactions = await instantSwap({
            tokenIn,
            tokenOut,
            amountIn: amount,
            swapTodos,
            slippageTolerance,
            AccountId: accountId,
        });

        // Si se necesita un depósito de almacenamiento, agréguelo a las transacciones
        if (!hasStorageIn) {
            transactions.unshift({
                receiverId: inputTokenId,
                functionCalls: [
                    {
                        methodName: "storage_deposit",
                        args: {
                            account_id: accountId,
                            registration_only: true,
                        },
                        gas: "30000000000000",
                        amount: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                    },
                ],
            });
        }

        if (!hasStorageOut) {
            transactions.unshift({
                receiverId: outputTokenId,
                functionCalls: [
                    {
                        methodName: "storage_deposit",
                        args: {
                            account_id: accountId,
                            registration_only: true,
                        },
                        gas: "30000000000000",
                        amount: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                    },
                ],
            });
        }

        return transactions;
    } catch (error) {
        console.error("Error en swapToken:", error);
        throw error;
    }
}
   - Tipo: mejora

### Troubleshooting
### Problemas Comunes
1. No se puede conectar a la red NEAR
   - Causa: Las credenciales de la billetera NEAR no están configuradas
   - Solución: Asegúrese de configurar correctamente las credenciales de la billetera NEAR en el entorno de ejecución.

### Consejos de Depuración
- Asegúrese de que las credenciales de la billetera NEAR estén configuradas correctamente.
- Verifique que el ID de cuenta de la billetera esté correctamente asignado.

### Preguntas Frecuentes
Q: ¿Cómo puedo obtener información de cartera formateada?
A: Puede obtener información de cartera formateada utilizando el método `getFormattedPortfolio()` que se conecta a la red NEAR y devuelve la información detallada.

Q: ¿Qué sucede si las credenciales de la billetera NEAR no están configuradas?
A: Si las credenciales de la billetera NEAR no están configuradas, se generará un error indicando que las credenciales no están configuradas en la función `connect()`.

Q: ¿Cuál es el propósito de la función `checkStorageBalance()`?
A: La función `checkStorageBalance()` se utiliza para verificar el saldo de almacenamiento de un contrato para una cuenta específica.

Q: ¿Cuál es la función de `isTransferContent()`?
A: La función `isTransferContent()` se utiliza para verificar si el contenido proporcionado es una transferencia.

Q: ¿Qué promete la función `transferNEAR()`?
A: La función `transferNEAR()` promete transferir una cantidad específica de NEAR a un destinatario dado en la red NEAR.