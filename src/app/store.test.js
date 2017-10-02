import appStore from './store';

describe('app store', () => {
  it('should have title property', () => {
    expect(appStore).toHaveProperty('title');
  });

  test('@action setState to work correctly', () => {
    appStore.setState({ title: 'test' });
    expect(appStore.title).toBe('test');
  });
});
