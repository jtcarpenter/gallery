import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import {Spinner} from '../src/components/Spinner.jsx';

describe('Spinner', () => {
    const loading = true;
    it('renders', () => {
        var spinner = renderIntoDocument(
            <Spinner
                loading={loading}>
            </Spinner>);
        expect(spinner).to.exist;
    });
});