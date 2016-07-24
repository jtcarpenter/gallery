import paintings from '../src/reducers/paintings.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as paintingConfig from '../src/constants/paintingConfig';

describe('paintings reducer', () => {
    const maxLength = 10;

    describe('FETCH_BEGIN action type', () => {

        const state = {
            loading: false,
            data: []
        };
        let actual;

        beforeEach(() => {
            actual = paintings(state,
                {type: actionTypes.FETCH_BEGIN, maxLength: maxLength}
            );
        });

        it('should return object with loading property true', () => {
            expect(actual.loading).to.be.true;
        });

        it('should return object with new maxLength', () => {
            expect(actual.maxLength).to.equal(maxLength);
        });

        it('should return object with existing properties and values', () => {
            expect(actual.data).to.equal(state.data);
        });
    });

    describe('FETCH_SUCCESS action type', () => {

        const state = {
            loading: true,
            data: [],
            maxLength: maxLength
        };
        const dummyData = ["dummy"];
        let actual;

        beforeEach(() => {
            actual = paintings(state,
                {type: actionTypes.FETCH_SUCCESS, data: dummyData}
            );
        });

        it('should return object with loading property false', () => {
            expect(actual.loading).to.be.false;
        });

        it('should return object with new data', () => {
            expect(actual.data).to.equal(dummyData);
        });

        it('should return object with existing properties and values', () => {
            expect(actual.maxLength).to.equal(maxLength);
        });
    });

    describe('FETCH_FAIL action type', () => {

        const state = {
            loading: true,
            data: [],
            maxLength: maxLength
        };
        const dummyData = ["dummy"];
        let actual;

        beforeEach(() => {
            actual = paintings(state,
                {type: actionTypes.FETCH_FAIL, error: 'dummy error'}
            );
        });

        it('should return object with loading property false', () => {
            expect(actual.loading).to.be.false;
        });

        it('should return object with new error', () => {
            expect(actual.error).to.equal(paintingConfig.FETCH_ERROR);
        });

        it('should return object with existing properties and values', () => {
            expect(actual.maxLength).to.equal(maxLength);
        });
    });
});
