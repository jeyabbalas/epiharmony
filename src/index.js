async function loadStylesInShadow(urls, shadowRoot) {
    try {
        // Load all stylesheets
        const cssTexts = await Promise.all(
            urls.map(async url => {
                const response = await fetch(url);
                return response.text();
            })
        );

        // Combine all CSS into a single style element
        const style = document.createElement('style');
        style.textContent = cssTexts
            .map(css =>
                // Scope styles to shadow root
                css.replace(/html/g, ':host')
                   .replace(/body/g, ':host')
            )
            .join('\n');

        shadowRoot.appendChild(style);
    } catch (error) {
        console.error('Error loading styles:', error);
        throw error;
    }
}


async function embedGui(divId) {
    let container = divId ? document.getElementById(divId) : document.createElement('div');

    if (!container.shadowRoot) {
        container.attachShadow({ mode: 'open' });
    }

    const styleUrls = [
        'https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css',
        // 'path/to/custom.css'
    ];

    try {
        await loadStylesInShadow(styleUrls, container.shadowRoot);

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
        if (container.shadowRoot) {
            while (container.shadowRoot.firstChild) {
                container.shadowRoot.removeChild(container.shadowRoot.firstChild);
            }
        }

        if (!container.id && document.body.contains(container)) {
            document.body.removeChild(container);
        }
    } catch (error) {
        console.error('Error during clean up:', error);
        throw error;
    }
}


export { embedGui, clearGui };