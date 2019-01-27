
module.exports = function (Dictionary) {

  /**
   * addWord
   * @param {string} english The english word in the database.
   * @param {string} hungarian The hungarian word in the database.
   * @param {string} partsOfSpeech The parts of speech of the given word in the database.
   * @param {string} synonym The synonym of the given word in the database.
   * @param {string} example An example sentence with the given word in the database.
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {any} result Result object
   */
  Dictionary.addWord = function (english, hungarian, partsOfSpeech, synonym, example, callback) {

    var postgres = Dictionary.app.dataSources.postgres.connector;

    if (synonym != undefined && example != undefined) {
      var params = [english, hungarian, partsOfSpeech, synonym, example];
      var sql = 'INSERT INTO dictionary (english, hungarian, pos, synonym, example) VALUES ($1, $2, $3, $4, $5);';
    } else if (synonym != undefined && example == undefined) {
      var params = [english, hungarian, partsOfSpeech, synonym];
      var sql = 'INSERT INTO dictionary (english, hungarian, pos, synonym) VALUES ($1, $2, $3, $4);';
    } else if (synonym == undefined && example != undefined) {
      var params = [english, hungarian, partsOfSpeech, example];
      var sql = 'INSERT INTO dictionary (english, hungarian, pos, example) VALUES ($1, $2, $3, $4);';
    } else {
      var params = [english, hungarian, partsOfSpeech];
      var sql = 'INSERT INTO dictionary (english, hungarian, pos) VALUES ($1, $2, $3);';
    }

    postgres.execute(sql, params, function (data, error) {
      callback(data, error);
    });

  }


  /**
   * getAllWords
  
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Dictionary} result Result object
   */
  Dictionary.getAllWords = function (callback) {

    var postgres = Dictionary.app.dataSources.postgres.connector;
    var sql = 'SELECT * FROM dictionary ORDER BY id;';
    postgres.execute(sql, function (data, error) {
      callback(data, error);
    });

  }


  /**
   * getOneWord
   * @param {number} id The id of the word in the database.
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Dictionary} result Result object
   */
  Dictionary.getOneWord = function (id, callback) {

    var postgres = Dictionary.app.dataSources.postgres.connector;
    var sql = 'SELECT * FROM dictionary WHERE id = $1;';
    var params = [id];
    postgres.execute(sql, params, function (data, error) {
      callback(data, error);
    });

  }


  /**
   * checkWord
   * @param {string} english The english word in the database.
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {any} result Result object
   */
  Dictionary.checkWord = function (english, callback) {
    var postgres = Dictionary.app.dataSources.postgres.connector;
    var sql = 'SELECT * FROM dictionary WHERE english = $1;';
    var params = [english];
    postgres.execute(sql, params, function (data, error) {
      callback(data, error);
    });

  }


  /**
   * modifyWord
   * @param {number} id The id of the word in the database.
   * @param {string} english The english word in the database.
   * @param {string} hungarian The hungarian word in the database.
   * @param {string} partsOfSpeech The parts of speech of the given word in the database.
   * @param {string} synonym The synonym of the given word in the database.
   * @param {string} example An example sentence with the given word in the database.
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {any} result Result object
   */
  Dictionary.modifyWord = function (id, english, hungarian, partsOfSpeech, synonym, example, callback) {

    var postgres = Dictionary.app.dataSources.postgres.connector;

    if (synonym != undefined && example != undefined) {
      var params = [id, english, hungarian, partsOfSpeech, synonym, example];
      var sql = 'UPDATE dictionary SET english = $2, hungarian = $3, pos = $4, synonym = $5, example = $6 WHERE id = $1;';
    } else if (synonym != undefined && example == undefined) {
      var params = [id, english, hungarian, partsOfSpeech, synonym];
      var sql = 'UPDATE dictionary SET english = $2, hungarian = $3, pos = $4, synonym = $5 WHERE id = $1;';
    } else if (synonym == undefined && example != undefined) {
      var params = [id, english, hungarian, partsOfSpeech, example];
      var sql = 'UPDATE dictionary SET english = $2, hungarian = $3, pos = $4, example = $5 WHERE id = $1;';
    } else {
      var params = [id, english, hungarian, partsOfSpeech];
      var sql = 'UPDATE dictionary SET english = $2, hungarian = $3, pos = $4 WHERE id = $1;';
    }

    postgres.execute(sql, params, function (data, error) {
      callback(data, error);
    });

  }


  /**
   * deleteWord
   * @param {number} id The id of the word in the database.
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {any} result Result object
   */
  Dictionary.deleteWord = function (id, callback) {

    var postgres = Dictionary.app.dataSources.postgres.connector;
    var sql = 'DELETE FROM dictionary WHERE id = $1;';
    var params = [id];
    postgres.execute(sql, params, function (data, error) {
      callback(data, error);
    });

  }




  Dictionary.remoteMethod('addWord',
    {
      isStatic: true,
      consumes: ['application/json'],
      accepts:
        [{
          arg: 'english',
          type: 'string',
          description: 'The english word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'hungarian',
          type: 'string',
          description: 'The hungarian word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'partsOfSpeech',
          type: 'string',
          description: 'The parts of speech of the given word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'synonym',
          type: 'string',
          description: 'The synonym of the given word in the database.',
          required: false,
          http: { source: 'query' }
        },
        {
          arg: 'example',
          type: 'string',
          description: 'An example sentence with the given word in the database.',
          required: false,
          http: { source: 'query' }
        }],
      returns: [],
      http: { verb: 'post', path: '/addWord' },
      description: undefined
    }
  );

  Dictionary.remoteMethod('getAllWords',
    {
      isStatic: true,
      produces: ['application/json'],
      accepts: [],
      returns:
        [{
          description: 'The words have been queried.',
          type: ['Dictionary'],
          arg: 'data',
          root: true
        }],
      http: { verb: 'get', path: '/getAllWords' },
      description: undefined
    }
  );

  Dictionary.remoteMethod('getOneWord',
    {
      isStatic: true,
      produces: ['application/json'],
      accepts:
        [{
          arg: 'id',
          type: 'number',
          description: 'The id of the word in the database.',
          required: true,
          http: { source: 'query' }
        }],
      returns:
        [{
          description: 'The word has been queried.',
          type: ['Dictionary'],
          arg: 'data',
          root: true
        }],
      http: { verb: 'get', path: '/getOneWord' },
      description: undefined
    }
  );

  Dictionary.remoteMethod('checkWord',
    {
      isStatic: true,
      produces: ['application/json'],
      accepts:
        [{
          arg: 'english',
          type: 'string',
          description: 'The english word in the database.',
          required: true,
          http: { source: 'query' }
        }],
      returns: [{
        description: 'The word is already in your database.',
        type: ['Dictionary'],
        arg: 'data',
        root: true
      }],
      http: { verb: 'get', path: '/checkWord' },
      description: undefined
    }
  );

  Dictionary.remoteMethod('modifyWord',
    {
      isStatic: true,
      produces: ['application/json'],
      accepts:
        [{
          arg: 'id',
          type: 'number',
          description: 'The id of the word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'english',
          type: 'string',
          description: 'The english word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'hungarian',
          type: 'string',
          description: 'The hungarian word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'partsOfSpeech',
          type: 'string',
          description: 'The parts of speech of the given word in the database.',
          required: true,
          http: { source: 'query' }
        },
        {
          arg: 'synonym',
          type: 'string',
          description: 'The synonym of the given word in the database.',
          required: false,
          http: { source: 'query' }
        },
        {
          arg: 'example',
          type: 'string',
          description: 'An example sentence with the given word in the database.',
          required: false,
          http: { source: 'query' }
        }],
      returns: [],
      http: { verb: 'put', path: '/modifyWord' },
      description: undefined
    }
  );

  Dictionary.remoteMethod('deleteWord',
    {
      isStatic: true,
      produces: ['application/json'],
      accepts:
        [{
          arg: 'id',
          type: 'number',
          description: 'The id of the word in the database.',
          required: true,
          http: { source: 'query' }
        }],
      returns: [],
      http: { verb: 'delete', path: '/deleteWord' },
      description: undefined
    }
  );

}
