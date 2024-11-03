async function loadStylesInShadow(url, shadowRoot) {
    try {
        const response = await fetch(url);
        const css = await response.text();
        const style = document.createElement('style');
        style.textContent = css;
        shadowRoot.appendChild(style);
    } catch (error) {
        console.error('Error loading styles:', error);
        throw error;
    }
}


async function embedGui(divId) {
    let container = divId ? document.getElementById(divId) : document.createElement('div');

    if (!container.shadowRoot) {
        container.attachShadow({mode: 'open'});
    }

    const tailwindUrl = 'https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css';

    try {
        await loadStylesInShadow(tailwindUrl, container.shadowRoot);

        const content = document.createElement('div');
        content.innerHTML = `
            <h1 class="text-3xl font-bold underline">
                Hello World!
            </h1>
        `;
        container.shadowRoot.appendChild(content);

        if (!divId) {
            document.body.appendChild(container);
        }

        return container;
    } catch (error) {
        console.error('Error setting up GUI:', error);
        throw error;
    }
}


function clearGui(container) {
    try {
        if (!container) {
            throw new Error('Container is required for clean up');
        }

        if (container.shadowRoot) {
            while (container.shadowRoot.firstChild) {
                container.shadowRoot.removeChild(container.shadowRoot.firstChild);
            }
        }

        // Remove container only if it was dynamically created (no div ID provided)
        if (!container.id && document.body.contains(container)) {
            document.body.removeChild(container);
        }
    } catch (error) {
        console.error('Error during clean up:', error);
        throw error;
    }
}


export {embedGui, clearGui};