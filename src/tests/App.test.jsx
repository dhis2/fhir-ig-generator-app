import { CustomDataProvider } from '@dhis2/app-runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import MyApp from '../App.jsx'

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('ProgramLogicalModel.fsh.handlebars')) {
            return Promise.resolve({
                text: () => Promise.resolve('Template content'),
            });
        }
        return Promise.reject(new Error(`Unhandled request: ${url}`));
    });
});

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(
        <CustomDataProvider>
            <MyApp />
        </CustomDataProvider>
    );

    root.unmount();
});
