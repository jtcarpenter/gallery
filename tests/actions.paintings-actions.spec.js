import * as paintingsActions from '../src/actions/paintingsActions.js';
import * as actionTypes from '../src/constants/actionTypes.js';

describe('paintingsActions', () => {
    const maxLength = 10;
    const json = {"dummy":"dummy"};

    it('should create an action with type FETCH_BEGIN', () => {
        const expectedAction = {
            type: actionTypes.FETCH_BEGIN,
            maxLength: maxLength
        }
        expect(paintingsActions.request(maxLength)).to.eql(expectedAction);
    });

    it('should create an action with type FETCH_SUCCESS', () => {
        const expectedAction = {
            type: actionTypes.FETCH_SUCCESS,
            data: json,
            receivedAt: Date.now()
        }
        expect(paintingsActions.response(json, maxLength).type)
            .to.eql(expectedAction.type)
        expect(paintingsActions.response(json, maxLength).data)
            .to.eql(expectedAction.data)
        expect(paintingsActions.response(json, maxLength).receivedAt)
            .to.be.at.least(expectedAction.receivedAt)
    });
});
