import { CustomDataProvider } from '@dhis2/app-runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App.js'

beforeEach(() => {
    global.fetch = jest.fn(() => 
        Promise.resolve({
            text: () => Promise.resolve('Template content')
        })
    );
});

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
});

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CustomDataProvider>
            <App />
        </CustomDataProvider>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
