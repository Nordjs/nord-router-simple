import path from 'path';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonChai);

import Router from '../../lib/router.js';

describe('Unit: Router class', () => {
  let req;
  let res;
  let nordRouter;

  beforeEach(() => {
    nordRouter = new Router(
      path.join(__dirname, '..', 'fixtures', 'nord-project', 'app')
    );

    req = {
      method: 'GET'
    };

    res = {
      statusCode: sinon.spy(),
      end       : sinon.spy()
    };
  });

  it('can route requests to the right files', async () => {
    req.url = 'great';

    await nordRouter.routeTo(req, res);

    expect(res.statusCode).to.not.have.been.called;
    expect(res.end).to.have.been.calledOnce;
  });

  it('throws a 404 error if the routed file does not exist', async () => {
    req.url  = 'nonexistant';

    await nordRouter.routeTo(req, res);

    expect(res.statusCode).to.have.been.calledWith(404);
    expect(res.end).to.have.been.calledOnce;
  });
});
