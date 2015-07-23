import path from 'path';

export default class NordRouterSimple {

  constructor(root='.app') {
    this.appRoot = path.relative(__dirname, root);
  }

  /**
   * Handles all incoming requests and forwards them to the right files
   * and functions
   *
   * @param {object} req The Node request object
   * @param {object} res The Node response object
   * @returns when the res ends and gets displayed to the user
   */
  routeTo(req, res) {
    const filePath = path.join(this.appRoot, req.url);
    const fileMethod = req.method.toLowerCase();

    try {
      const UserResource = require(filePath);
      const resource = new UserResource(req, res);
      // calls the user function to process the request
      resource[fileMethod]();
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        res.statusCode(404);
        return res.end(`404 error! ${req.url} could not be found.`);
      } else {
        res.statusCode(500);
        return res.end('Internal error');
      }
    }

    return res.end();
  }

}
