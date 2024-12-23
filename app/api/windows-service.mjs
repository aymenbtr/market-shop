import { Service } from 'node-windows';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new service object
const svc = new Service({
  name: 'MarketplaceServer',
  description: 'The marketplace server application.',
  script: join(__dirname, 'server.mjs'), // Ensure server.mjs is updated as well
  nodeOptions: [],
  // Allow service to restart on failure
  restartOnFailure: true
});

// Listen for events
svc.on('install', function() {
  svc.start();
  console.log('Install complete.');
  console.log('Service started.');
});

svc.on('uninstall', function() {
  console.log('Uninstall complete.');
  console.log('The service exists:', svc.exists);
});

// Install the service
svc.install();
