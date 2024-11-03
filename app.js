import { embedGui, clearGui } from './src/index.js';


try {
    const container = await embedGui('app');
    // sleep for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    clearGui(container);
} catch (error) {
    console.error('Failed to embed GUI:', error);
}