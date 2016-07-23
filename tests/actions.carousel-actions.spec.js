import * as carouselActions from '../src/actions/carouselActions.js';
import * as actionTypes from '../src/constants/actionTypes.js';

describe('carouselActions', () => {
    it('should create an action with type SELECT', () => {
        const id = 'dummy';
        const expectedAction = {
            type: actionTypes.SELECT,
            id: id
        }
        expect(carouselActions.select(id)).to.eql(expectedAction)
    });

    it('should create an action with type INIT', () => {
        const id = 'dummy';
        const data = {};
        const expectedAction = {
            type: actionTypes.INIT,
            data: {},
            id: id
        }
        expect(carouselActions.init(data, id)).to.eql(expectedAction)
    });
});