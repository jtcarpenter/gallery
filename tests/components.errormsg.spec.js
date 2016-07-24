import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import {ErrorMsg} from '../src/components/ErrorMsg.jsx';

describe('ErrorMsg', () => {
    const error = 'dummy error';
    it('renders', () => {
        var errorMsg = renderIntoDocument(
            <ErrorMsg
                error={error}>
            </ErrorMsg>);
        expect(errorMsg).to.exist;
    });
});