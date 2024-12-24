import { Service } from 'node-windows';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new service object
const svc = new Service({
  name: 'DZ-Market Server',
  description: 'The DZ-Market server service',
  script: join(__dirname, 'server.mjs'),
  nodeOptions: ['--experimental-modules'],
  env: [{
    name: "NODE_ENV",
    value: "production"
  }]
});

// Listen for service events
svc.on('install', () => {
  console.log('Service installed successfully');
  svc.start();
});

svc.on('alreadyinstalled', () => {
  console.log('Service is already installed');
  svc.start();
});

svc.on('start', () => {
  console.log('Service started successfully');
});

svc.on('stop', () => {
  console.log('Service stopped');
});

svc.on('uninstall', () => {
  console.log('Service uninstalled');
});

svc.on('error', (err) => {
  console.error('Service error:', err);
});

// Install the service
svc.install();

// Ensure graceful shutdown
process.on('SIGINT', () => {
  console.log('Graceful shutdown initiated');
  svc.stop(() => {
    console.log('Service stopped gracefully');
    process.exit(0);
  });
});
