import { modal } from './reown.js';
import { wagmiAdapter } from './reown.js';
import { getAccount } from '@wagmi/core';


async function connectWallet() {
    // Open the wallet connection modal and wait for user interaction
    await modal.open();
    let walletInfo = null;

    while(!walletInfo) {
        // Get the connected account
        walletInfo = await getAccount(wagmiAdapter);
        setTimeout(1000)
    }
    return walletInfo;
}

document.addEventListener('DOMContentLoaded', () => {
    // Open Connect Modal and handle wallet connection
    document.getElementById('open-connect-modal').addEventListener('click', async () => {
        window.location.href = '/src/vote-list.html';
        /*
        try {
            const wallet = await connectWallet();
            if (wallet) {
                console.log('Connected account:', wallet.name);
            } else {
                console.log('No account found');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }*/
    });

    // Back button functionality
    document.getElementById('back').addEventListener('click', () => {
        window.history.back();
    });
});