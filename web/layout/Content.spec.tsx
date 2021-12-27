import React from 'react';
import Content from '@layout/Content';
import { renderWithClient } from '../__mocks__/utils';
describe.only('Wrapper', () => {
  it('should render name', async () => {
    const result = renderWithClient(
      <Content tabTitle="Jest">
        <div data-testid="child">child</div>
      </Content>
    );

    expect(await result.findByText('test test2')).toBeInTheDocument();
  });

  // it.skip('should fail', async () => {
  //   server.use(
  //     rest.get('*/user/me', (req, res, ctx) => {
  //       return res(ctx.status(500));
  //     })
  //   );

  //   renderWithClient(
  //     <Content tabTitle="Jest">
  //       <div data-testid="child">child</div>
  //     </Content>
  //   );

  //   await waitFor(() => expect(mockPush).toHaveBeenCalled());
  // });
});
