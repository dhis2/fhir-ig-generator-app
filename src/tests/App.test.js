import { CustomDataProvider } from '@dhis2/app-runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from '../App.js'

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('ProgramLogicalModel.fsh.handlebars')) {
            return Promise.resolve({
                text: () => Promise.resolve('Template content')
            });
        }
        return Promise.reject(new Error(`Unhandled request: ${url}`));
    });
});

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
});

it('renders without crashing', async () => {
    const div = document.createElement('div')
    await act(async () => {
        ReactDOM.render(
            <CustomDataProvider>
                <App />
            </CustomDataProvider>,
            div
        );
    });

    ReactDOM.unmountComponentAtNode(div)
});
