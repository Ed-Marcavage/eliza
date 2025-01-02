# @elizaos/plugin-near Documentation

## Overview
### Purpose
@elizaos/plugin-near es un paquete de plugin que proporciona una variedad de funciones y componentes para interactuar con la red NEAR. Desde transferencias de tokens hasta verificaciones de saldos y configuraciones, este paquete está diseñado para simplificar el desarrollo de aplicaciones que utilizan la red NEAR.

#### Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- Classes:
  - WalletProvider: Proveedor de cartera que implementa la interfaz Provider.

- Interfaces:
  - TransferContent: Interfaz que representa el contenido de una transferencia.
  - NearToken: Interfaz para representar un token cercano.
  - WalletPortfolio: Interfaz que describe un portafolio de billetera.

- Types:
  - NearConfig: Tipo de datos que corresponde a la configuración de Near.

- Functions:
  - checkStorageBalance: Verifica el saldo de almacenamiento de un contrato en la cuenta proporcionada.
  - swapToken: Realiza un intercambio de tokens de forma asíncrona.
  - isTransferContent: Verifica si el contenido es un objeto de tipo TransferContent.
  - transferNEAR: Función asincrónica para transferir NEAR a un destinatario.
  - getConfig: Función para obtener la configuración según el entorno especificado.
  - validateNearConfig: Valida la configuración de Near.

Características clave:
- Función 1: Breve descripción
- Función 2: Breve descripción
[Listar las características clave con descripciones breves]

## Installation
## Instrucciones de instalación e integración del plugin @elizaos/plugin-near

### Paso 1: Agregar el plugin a tu proyecto ElizaOS
- Primero, los usuarios deben agregar lo siguiente a las dependencias de su agent/package.json:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Luego, explicar que necesitan:
  1. Ir al directorio agent/
  2. Ejecutar pnpm install para instalar la nueva dependencia
  3. Ejecutar pnpm build para construir el proyecto con el nuevo plugin

### Paso 2: Importar y usar el plugin después de la instalación
- Sintaxis de importación usando: import { nearPlugin } from "@elizaos/plugin-near";
- Cómo agregarlo al array de plugins de AgentRuntime

### Paso 3: Ejemplo de integración mostrando la configuración completa
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
- Para este paso, simplemente indicar al usuario que se asegure de ver ["✓ Registering action: <acciones del plugin>"] en la consola.

## Configuration
# Documentación de configuración

Para configurar correctamente la aplicación, es importante definir las siguientes variables de entorno en el archivo `.env`.

### Variables de Entorno Requeridas:

1. `NEAR_ENV` 
   - Propósito: Define el entorno NEAR.
   
2. `REACT_APP_REF_SDK_ENV`
   - Propósito: Define el entorno del SDK de referencia de React.
   
3. `NEAR_WALLET_SECRET_KEY`
   - Propósito: Define la clave secreta del monedero NEAR.
   
4. `NEAR_WALLET_PUBLIC_KEY`
   - Propósito: Define la clave pública del monedero NEAR.

5. `NEAR_ADDRESS`
   - Propósito: Define la dirección NEAR.
   
6. `SLIPPAGE`
   - Propósito: Define el deslizamiento.
   
7. `RPC_URL`
   - Propósito: Define la URL del proveedor de servicios de red RPC.
   
8. `NEAR_NETWORK`
   - Propósito: Define la red NEAR.

### Archivo de Ejemplo .env:

```dotenv
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your-secret-key-here
NEAR_WALLET_PUBLIC_KEY=your-public-key-here
NEAR_ADDRESS=your-near-address
SLIPPAGE=1
RPC_URL=your-rpc-url-here
NEAR_NETWORK=testnet
```

Recuerda que la configuración se realiza en el archivo `.env` y es importante asegurarse de que este archivo esté incluido en el archivo `.gitignore` para que no se comprometa en el repositorio.

## Features

### Actions
### [EJECUTAR_CANJE_CERCA]

Realiza un intercambio de tokens utilizando Ref Finance.

#### Propiedades
- Nombre: EJECUTAR_CANJE_CERCA
- Similes: [SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR]

#### Controlador
Inicializa el SDK de Ref con el entorno de la red de testnet, compone el estado, obtiene la información de la cartera, y genera un objeto de contexto de intercambio. Luego verifica los parámetros requeridos y ejecuta el intercambio de tokens, firmando y enviando transacciones al servidor NEAR.

#### Ejemplos
- **Ejemplo 1:**
  - Usuario 1:
    - ID del token de entrada: wrap.testnet
    - ID del token de salida: ref.fakes.testnet
    - Cantidad: 1.0
  - Usuario 2:
    - Texto: "Intercambiando 1.0 NEAR por REF..."
  - Usuario 2:
    - Texto: "¡Intercambio completado con éxito! Identificador de transacción: ..."

### [SEND_NEAR]
Transferir tokens NEAR a otra cuenta

#### Propiedades
- Nombre: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
La función maneja la transferencia de tokens NEAR a otra cuenta. Primero valida el contenido de la transferencia, luego genera el contenido de la transferencia y finalmente realiza la transferencia a través de la función `transferNEAR`.

#### Ejemplos
```typescript
[
    [
        {
            user: "{{user1}}",
            content: {
                text: "Enviar 1.5 NEAR a bob.testnet",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "Voy a enviar 1.5 NEAR ahora...",
                action: "SEND_NEAR",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "Se enviaron exitosamente 1.5 NEAR a bob.testnet\nTransacción: ABC123XYZ",
            },
        },
    ],
] as ActionExample[][],
```



### Providers
### Proveedor de Cartera
Provee funcionalidades para interactuar con carteras digitales y realizar transacciones utilizando la red NEAR.

#### Métodos
Enfoque en el método get() y su funcionalidad.

#### Uso
```typescript

import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { KeyPair, keyStores, connect, Account, utils } from "near-api-js";
import BigNumber from "bignumber.js";
import { KeyPairString } from "near-api-js/lib/utils";
import NodeCache from "node-cache";

const CONFIGURACIÓN_DEL_PROVEEDOR = {
    networkId: process.env.NEAR_NETWORK || "testnet",
  
    // ... código restante truncado ...
}
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. **Obtener el valor del portafolio:** Utilizar el método `fetchPortfolioValue` para recuperar el valor del portafolio de la billetera.
   ```typescript
   const walletProvider = new WalletProvider();
   const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
   console.log(portfolioValue);
   ```

2. **Formatear el portafolio:** Utilizar el método `formatPortfolio` para formatear la información del portafolio del usuario.
   ```typescript
   const walletProvider = new WalletProvider();
   const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
   console.log(formattedPortfolio);
   ```

### Best Practices
- **Manejo de errores:** Siempre manejar adecuadamente las excepciones lanzadas por el método `fetchPortfolioValue` para asegurarse de capturar cualquier error durante la recuperación del valor del portafolio.
- **Documentación clara:** Utilizar comentarios descriptivos en los métodos y clases para facilitar la comprensión del código y su uso por otros desarrolladores.

### actions/transfer.ts

- **Use Case 1:** Realizar una transferencia de NEAR a un destinatario.
  
  ```typescript
  import { transferNEAR } from './actions/transfer';

  async function realizarTransferenciaNEAR() {
      const destinatario = 'destinatario.near';
      const cantidad = '10';
      const hashTransaccion = await transferNEAR(runtime, destinatario, cantidad);
      
      console.log(`La transacción se ha realizado con éxito. Hash de transacción: ${hashTransaccion}`);
  }

  realizarTransferenciaNEAR();
  ```

- **Use Case 2:** Verificar si un contenido es de tipo TransferContent.

  ```typescript
  import { isTransferContent } from './actions/transfer';

  function verificarTipoContenido(contenido: any) {
      if (isTransferContent(runtime, contenido)) {
          console.log('El contenido es de tipo TransferContent.');
      } else {
          console.log('El contenido no es de tipo TransferContent.');
      }
  }

  const contenidoEjemplo = {
      recipient: 'destinatario',
      amount: '10',
      tokenAddress: 'token.near'
  };

  verificarTipoContenido(contenidoEjemplo);
  ```

- **Best Practice 1:** Utiliza nombres descriptivos y claros para las variables y funciones para mejorar la legibilidad del código.

- **Best Practice 2:** Documenta correctamente el código siguiendo las convenciones JSDoc para facilitar su comprensión y mantenimiento.

### environment.ts

### Common Use Cases
1. Obtaining the configuration for a specific environment:
```typescript
import { getConfig } from './environment';

const config = getConfig('production');
console.log(config);
```

2. Validating the Near configuration with a runtime interface:
```typescript
import { validateNearConfig } from './environment';

const runtime = getRuntime(); // Assuming getRuntime() returns the runtime interface
validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log('Near configuration validated:', nearConfig);
  })
  .catch((error) => {
    console.error('Error validating Near configuration:', error);
  });
```

### Best Practices
- Avoid hardcoding environment configurations and always use the `getConfig` function to get the appropriate configuration dynamically based on the specified environment.
- Ensure that the runtime interface passed to `validateNearConfig` is correctly instantiated to prevent any validation errors.

### actions/swap.ts

- **Common Use Cases**
1. Realizar un intercambio de tokens utilizando la función `swapToken`.

Ejemplo de uso:
```typescript
const runtime: IAgentRuntime = getAgentRuntime();
const inputTokenId: string = "token1";
const outputTokenId: string = "token2";
const amount: string = "100";
const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount);
console.log(transactions);
```

2. Verificar el saldo de almacenamiento de un contrato utilizando la función `checkStorageBalance`.

Ejemplo de uso:
```typescript
const account: any = getAccount();
const contractId: string = "contract1";
const hasStorageBalance = await checkStorageBalance(account, contractId);
console.log(hasStorageBalance);
```

- **Best Practices**
- Se recomienda documentar las funciones utilizando JSDoc para facilitar la comprensión de su uso y parámetros.
- Es buena práctica utilizar nombres descriptivos para las variables y parámetros en español para mejorar la legibilidad del código.

## API Reference
### File: `providers/wallet.ts`
#### Classes

##### `WalletProvider`

```typescript
/**
 * Proveedor de cartera que implementa la interfaz Provider.
 */
 */
```

#### Interfaces

##### `NearToken`

```typescript
/**
 * Interfaz para representar un token cercano
 * @typedef {Object} NearToken
 * @property {string} name - Nombre del token
 * @property {string} symbol - Símbolo del token
 * @property {number} decimals - Decimales del token
 * @property {string} balance - Saldo del token
 * @property {string} uiAmount - Cantidad en la interfaz de usuario
 * @property {string} priceUsd - Precio en USD
 * @property {string} valueUsd - Valor en USD
 * @property {string} [valueNear] - Valor en NEAR (opcional)
 */
```

##### `WalletPortfolio`

```typescript
/**
 * Interfaz que describe un portafolio de billetera.
 * @typedef {object} WalletPortfolio
 * @property {string} totalUsd - Total en USD en el portafolio.
 * @property {string} [totalNear] - Opcional. Total en NEAR en el portafolio.
 * @property {Array<NearToken>} tokens - Lista de tokens NEAR en el portafolio.
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor de la clase con parametro de cuenta de usuario.
 * Se inicializa un nuevo NodeCache con un tiempo de vida del cache de 5 minutos.
 * Se inicializa un nuevo InMemoryKeyStore para almacenar las claves.
 */
```

##### `get`

```typescript
/**
 * Método asíncrono para obtener un string formateado del portafolio.
 * 
 * @param {IAgentRuntime} runtime - Interfaz que representa el tiempo de ejecución del agente.
 * @param {Memory} _message - Objeto que representa el mensaje.
 * @param {State} _state - Estado opcional.
 * @returns {Promise<string | null>} El string formateado del portafolio o nulo si hay un error.
 */
```

##### `connect`

```typescript
/**
 * Conecta la aplicación al runtime del agente.
 * 
 * @param {IAgentRuntime} runtime - El objeto runtime del agente.
 * @returns {Promise<any>} La cuenta conectada.
 * @throws {Error} Si las credenciales de la billetera NEAR no están configuradas.
 */
```

##### `fetchWithRetry`

```typescript
/**
 * Realiza una solicitud a la URL proporcionada con opciones opcionales y maneja reintentos en caso de error.
 * 
 * @param {string} url - La URL a la que se va a realizar la solicitud.
 * @param {RequestInit} [options={}] - Opciones adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve en la respuesta JSON de la solicitud.
 */
```

##### `fetchPortfolioValue`

```typescript
/**
 * Método asíncrono para recuperar el valor del portafolio.
 * 
 * @param {IAgentRuntime} runtime - El entorno de ejecución del agente.
 * @returns {Promise<WalletPortfolio>} El valor del portafolio en la billetera.
 * @throws Lanza un error si no se puede recuperar el valor del portafolio.
 */
```

##### `fetchNearPrice`

```typescript
/**
 * Método privado asíncrono para recuperar el precio cercano.
 * 
 * @returns {Promise<number>} El precio cercano en USD.
 */
```

##### `formatPortfolio`

```typescript
/**
 * Formatea la cartera del usuario en un formato legible para mostrar.
 * 
 * @param {IAgentRuntime} runtime - La instancia de tiempo de ejecución del agente.
 * @param {WalletPortfolio} portfolio - La cartera del usuario que se formateará.
 * @returns {string} La información formateada de la cartera del usuario.
 */
```

##### `getFormattedPortfolio`

```typescript
/**
 * Obtiene el valor del portafolio formateado de manera asíncrona.
 * 
 * @param {IAgentRuntime} runtime - Interfaz que representa el entorno de ejecución del agente.
 * @returns {Promise<string>} El valor del portafolio formateado.
 */
```
### File: `actions/transfer.ts`
#### Interfaces

##### `TransferContent`

```typescript
/**
 * Interfaz que representa el contenido de una transferencia.
 * Hereda de la interfaz 'Content'.
 * @interface
 * @property {string} recipient - El destinatario de la transferencia.
 * @property {string|number} amount - La cantidad de la transferencia.
 * @property {string} [tokenAddress] - Opcional para transferencias nativas de NEAR.
 */
```

#### Functions

##### `isTransferContent`

```typescript
/**
* Verifica si el contenido es un objeto de tipo TransferContent.
* @param {IAgentRuntime} runtime - La interfaz del agente en tiempo de ejecución.
* @param {any} content - El contenido a verificar.
* @returns {boolean} - Indica si el contenido es de tipo TransferContent.
*/
```

##### `transferNEAR`

```typescript
/**
 * Función asincrónica para transferir NEAR a un destinatario.
 * @param {IAgentRuntime} runtime - La instancia del tiempo de ejecución del agente.
 * @param {string} recipient - La dirección del destinatario.
 * @param {string} amount - La cantidad de NEAR a transferir.
 * @returns {Promise<string>} El hash de la transacción de la transferencia.
 */
```
### File: `environment.ts`
#### Types

##### `NearConfig`

```typescript
/**
 * Tipo de datos que corresponde a la configuración de Near.
 */
```

#### Functions

##### `getConfig`

```typescript
/**
 * Función para obtener la configuración según el entorno especificado.
 * @param {string | undefined | null} env - El entorno especificado (por defecto ENV, process.env.NEAR_ENV o process.env.REACT_APP_REF_SDK_ENV)
 * @returns {Object} - La configuración correspondiente al entorno especificado
 */
```

##### `validateNearConfig`

```typescript
/**
 * Valida la configuración de Near.
 * 
 * @param {IAgentRuntime} runtime - Interfaz de tiempo de ejecución del agente.
 * @returns {Promise<NearConfig>} Promesa que resuelve en NearConfig, la configuración validada de Near.
 */
```
### File: `actions/swap.ts`
#### Functions

##### `checkStorageBalance`

```typescript
/**
 * Verifica el saldo de almacenamiento de un contrato en la cuenta proporcionada.
 * 
 * @param {any} account - La cuenta a través de la cual se accede al contrato.
 * @param {string} contractId - El identificador único del contrato.
 * @returns {Promise<boolean>} Devuelve true si el saldo de almacenamiento es distinto de cero, de lo contrario devuelve false.
 */
```

##### `swapToken`

```typescript
/**
 * Realiza un intercambio de tokens de forma asíncrona.
 * @param {IAgentRuntime} runtime El entorno de ejecución del agente.
 * @param {string} inputTokenId El ID del token de entrada.
 * @param {string} outputTokenId El ID del token de salida.
 * @param {string} amount La cantidad de tokens a intercambiar.
 * @param {number} [slippageTolerance=0.01] La tolerancia de deslizamiento para el intercambio.
 * @returns {Promise<any>} Un objeto Promise que resuelve hacia una lista de transacciones para el intercambio.
 */
```

## Development

### TODO Items
No TODO items found.

### Troubleshooting
### Common Issues
1. El plugin no se instala correctamente
   - Causa: Problemas de compatibilidad de versiones
   - Solución: Asegúrate de tener las versiones correctas de Node.js y el plugin

### Debugging Tips
- Verifica la consola de errores en busca de mensajes de fallo
- Revisa las dependencias del plugin para detectar posibles conflictos

### FAQ
Q: ¿Cómo se transfieren NEAR tokens?
A: Para transferir NEAR tokens a un destinatario, utiliza la función `transferTokens` proporcionada por el plugin. Por ejemplo:
   ```javascript
   const tokenAmount = '10'; // Cantidad de tokens a transferir
   const recipient = 'example.near'; // Dirección del destinatario
   const transactionHash = await plugin.transferTokens(tokenAmount, recipient);
   ```