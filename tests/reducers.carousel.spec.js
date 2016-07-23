import carousel from '../src/reducers/carousel.js';
import * as actionTypes from '../src/constants/actionTypes.js';

describe('carousel reducer', () => {

    describe('when data set of length 10', () => {
        const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},
                    {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];

        describe('when carouselLength is 5', () => {
            const carouselLength = 5;

            describe('when first item is selected', () => {

                const state = {
                    carouselLength: carouselLength,
                    data: data,
                    items: []
                };

                describe('SELECT action type', () => {

                    describe('when selecting 2nd item in dataset', () => {
                        const defaultOffset = 0;
                        const selecting = 2;
                        let actual = null;
                        beforeEach(() => {
                            actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                        });

                        it('should return item list with length 5', () => {
                            expect(actual.items.length).to.equal(carouselLength);
                        });

                        it('should return item at default offset index with selected id', () => {
                            expect(actual.items[defaultOffset].id).to.equal(selecting);
                        });

                        it('should return last item in list with id 6', () => {
                            expect(actual.items[actual.items.length - 1].id).to.equal(6);
                        });

                        it('should set selected id', () => {
                            expect(actual.selected).to.equal(selecting);
                        });

                        it('should set prev id', () => {
                            expect(actual.prev).to.equal(1);
                        });

                        it('should set next id', () => {
                            expect(actual.next).to.equal(3);
                        });
                    });

                    describe('when selecting 5th (middle) item in dataset', () => {
                        const defaultOffset = 0;
                        const selecting = 5;
                        let actual = null;
                        beforeEach(() => {
                            actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                        });

                        it('should return item list with length 5', () => {
                            expect(actual.items.length).to.equal(carouselLength);
                        });

                        it('should return item at default offset index with selected id', () => {
                            expect(actual.items[defaultOffset].id).to.equal(selecting);
                        });

                        it('should return last item in list with id 6', () => {
                            expect(actual.items[actual.items.length - 1].id).to.equal(9);
                        });

                        it('should set selected id', () => {
                            expect(actual.selected).to.equal(selecting);
                        });

                        it('should set prev id', () => {
                            expect(actual.prev).to.equal(4);
                        });

                        it('should set next id', () => {
                            expect(actual.next).to.equal(6);
                        });
                    });

                    describe('when selecting 9th (second to last) item in dataset', () => {
                        const defaultOffset = 0;
                        const selecting = 9;
                        let actual = null;
                        beforeEach(() => {
                            state.items = [];
                            actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                        });

                        it('should return item list with length 5', () => {
                            expect(actual.items.length).to.equal(carouselLength);
                        });

                        it('should return correct items in correct order', () => {
                            expect(actual.items[defaultOffset].id).to.equal(selecting);
                            expect(actual.items[defaultOffset + 1].id).to.equal(10);
                            expect(actual.items[defaultOffset + 2].id).to.equal(1);
                            expect(actual.items[defaultOffset + 3].id).to.equal(2);
                            expect(actual.items[defaultOffset + 4].id).to.equal(3);
                        });

                        it('should return items with correct selected value', () => {
                            expect(actual.items[defaultOffset].id).to.equal(actual.selected);
                            expect(actual.items[defaultOffset + 1].id).to.not.equal(actual.selected);
                            expect(actual.items[defaultOffset + 2].id).to.not.equal(actual.selected);
                            expect(actual.items[defaultOffset + 3].id).to.not.equal(actual.selected);
                            expect(actual.items[defaultOffset + 4].id).to.not.equal(actual.selected);
                        });

                        it('should set selected id', () => {
                            expect(actual.selected).to.equal(selecting);
                        });

                        it('should set prev id', () => {
                            expect(actual.prev).to.equal(8);
                        });

                        it('should set next id', () => {
                            expect(actual.next).to.equal(10);
                        });
                    });
                });

                describe('offset is 3', () => {
                    const offset = 3;

                    describe('SELECT action', () => {
                        const state = {
                            carouselLength: carouselLength,
                            data: data,
                            offset: offset,
                            items: []
                        };

                        describe('when selecting 1st item in dataset', () => {
                            const selecting = 1;
                            let actual = null;
                            beforeEach(() => {
                                actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                            });

                            it('should return item list with length 5', () => {
                                expect(actual.items.length).to.equal(carouselLength);
                            });

                            it('should return item at default offset index with selected id', () => {
                                expect(actual.items[offset].id).to.equal(selecting);
                            });

                            it('should return first item with id 8 (carousel is offset)', () => {
                                expect(actual.items[0].id).to.equal(8);
                            });

                            it('should return last item with id 2 (carousel is offset)', () => {
                                expect(actual.items[actual.items.length - 1].id).to.equal(2);
                            });

                            it('should set selected id', () => {
                                expect(actual.selected).to.equal(selecting);
                            });

                            it('should set prev id', () => {
                                expect(actual.prev).to.equal(10);
                            });

                            it('should set next id', () => {
                                expect(actual.next).to.equal(2);
                            });
                        });
                    });

                });
            });

            describe('when 6th (middle) item is selected', () => {

                describe('when offset is 3', () => {
                    const offset = 3;

                    describe('SELECT action', () => {
                        const state = {
                            carouselLength: carouselLength,
                            data: data,
                            selected: 7,
                            offset: offset,
                            items: []
                        };

                        describe('when selecting 1st item in dataset', () => {
                            const selecting = 10;
                            let actual = null;
                            beforeEach(() => {
                                actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                            });

                            it('should return item list with length 5', () => {
                                expect(actual.items.length).to.equal(carouselLength);
                            });

                            it('should return item at default offset index with selected id', () => {
                                expect(actual.items[offset].id).to.equal(selecting);
                            });

                            it('should return last item in list with id 6', () => {
                                expect(actual.items[actual.items.length - 1].id).to.equal(1);
                            });
                        });

                        describe('when selecting last item in dataset', () => {
                            const selecting = 10;
                            let actual = null;
                            beforeEach(() => {
                                actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                            });

                            it('should return item list with length 5', () => {
                                expect(actual.items.length).to.equal(carouselLength);
                            });

                            it('should return item at default offset index with selected id', () => {
                                expect(actual.items[offset].id).to.equal(selecting);
                            });

                            it('should return last item in list with id 6', () => {
                                expect(actual.items[actual.items.length - 1].id).to.equal(1);
                            });

                            it('should set selected id', () => {
                                expect(actual.selected).to.equal(selecting);
                            });

                            it('should set prev id', () => {
                                expect(actual.prev).to.equal(9);
                            });

                            it('should set next id', () => {
                                expect(actual.next).to.equal(1);
                            });
                        });
                    });
                });
            });
        });

        describe('when carouselLength same as dataset length', () => {
            const carouselLength = data.length;

            describe('when first item is selected', () => {
                const selected = 0;

                describe('SELECT action', () => {
                    const state = {
                        carouselLength: carouselLength,
                        data: data,
                        items: []
                    };

                    describe('when selecting 2nd item in dataset', () => {
                        const defaultOffset = 0;
                        const selectedId = 2;
                        let actual = null;
                        beforeEach(() => {
                            actual = carousel(state, {type: actionTypes.SELECT, id: selectedId});
                        });

                        it('should return item list with length 5', () => {
                            expect(actual.items.length).to.equal(carouselLength);
                        });

                        it('should return item at default offset index with selected id', () => {
                            expect(actual.items[defaultOffset].id).to.equal(selectedId);
                        });

                        it('should return last item in list with id 6', () => {
                            expect(actual.items[actual.items.length - 1].id).to.equal(1);
                        });
                    });
                });
            });
        });
    });

    describe('when data set of length 13', () => {
        const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},
                    {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10},
                    {id: 11}, {id: 12}, {id: 13}];

        describe('when carouselLength is 10', () => {
            const carouselLength = 10;

            describe('when offset is 1', () => {
                const offset = 1;

                describe('when 1st item is selected', () => {
                    const selected = 1;

                    describe('SELECT action type', () => {

                        describe('when selecting 9th item', () => {
                            const selecting = 9;
                            let actual = null;
                            const state = {
                                carouselLength: carouselLength,
                                data: data,
                                selected: selected,
                                offset: offset,
                                items: []
                            };

                            beforeEach(() => {
                                actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                            });

                            it('should return item list with length 10', () => {
                                expect(actual.items.length).to.equal(carouselLength);
                            });

                            it('should return item at offset index with expected id', () => {
                                expect(actual.items[offset].id).to.equal(selecting);
                            });
                        });
                    });

                    describe('SELECT action type', () => {

                        describe('when selecting 1st item', () => {
                            const selecting = 1;
                            let actual = null;
                            const state = {
                                carouselLength: carouselLength,
                                data: data,
                                selected: selected,
                                offset: offset,
                                items: []
                            };

                            beforeEach(() => {
                                actual = carousel(state, {type: actionTypes.SELECT, id: selecting});
                            });

                            it('should return item list with length 10', () => {
                                expect(actual.items.length).to.equal(carouselLength);
                            });

                            it('should return item at offset index with expected id', () => {
                                expect(actual.items[offset].id).to.equal(selecting);
                            });
                        });
                    });
                });
            });
        });
    });
});
