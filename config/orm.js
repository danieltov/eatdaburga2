// * The Requires
// * ========================================
const connection = require('./connection');

// * The Helper Functions
// * ========================================

const log = console.log;

function printQuestionMarks(num) {
    // ! Declare an empty array
    let arr = [];

    for (let i = 0; i < num; i++) {
        // ! Push a ? into the array num times
        arr.push('?');
    }

    // ! return Array as a string
    // ! e.g.: printQuestionMarks(3) => [?,?,?] => '?,?,?'
    return arr.toString();
}

function objToSql(ob) {
    // ! Declare an empty array
    let arr = [];

    // ! Go through every key in ob (object)
    for (let key in ob) {
        // ! Bind value to variable
        let value = ob[key];

        // ! Check if key exists (not hidden) in ob
        if (Object.hasOwnProperty.call(ob, key)) {
            // ! If value is a string with spaces...
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                // ! ... wrap it in quotes
                // ! e.g. Hello World => 'Hello World'
                value = "'" + value + "'";
            }
            // ! Push a string into array that follows
            // ! this pattern:
            // ! 'key=value'. e.g.: 'name=daniel'
            arr.push(key + '=' + value);
        }
    }
    // ! Convert the array into a single, comma-separated string.
    // ! e.g.: { name: 'Daniel', age: 28} => 'name=Daniel,age=28'
    return arr.toString();
}

// * The ORM
// * ========================================

const orm = {
    // ! Select All Function
    selectAll: function(table, cb) {
        // ! Run mysql queryStr from 'table'
        connection.query('select * from ' + table + ';', function(e, r) {
            if (e) throw e;
            // ! Pass result into the callback
            cb(r);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        // ! Build mysql query
        let queryStr = 'INSERT INTO ' + table;
        // ! cols is an array, so convert into
        // ! comma-separated string
        queryStr += '(' + cols.toString() + ')';
        queryStr += ' VALUES (';
        // ! vals is an array. Print question marks in place
        // ! To avoid SQL injection
        queryStr += printQuestionMarks(vals.length) + ');';

        log(queryStr); // ! check queryStr string

        // ! Run query, pass through vals array, run handler callback
        connection.query(queryStr, vals, function(e, r) {
            if (e) throw e;
            // ! Pass results into callback
            cb(r);
        });
    },
    updateOne: function(table, data, condition, cb) {
        // ! Build queryStr string
        let queryStr = 'UPDATE ' + table;
        // ! data is an object
        // ! e.g. {name: 'Daniel', age: 28}
        // ! Convert to SQL friendly format with Helper Fn
        queryStr += ' SET ' + objToSql(data);
        queryStr += ' WHERE ' + condition;
        log(queryStr); // ! check queryStr string

        // ! Run query
        connection.query(queryStr, function(e, r) {
            if (e) throw e;
            // ! Pass results into callback
            cb(r);
        });
    }
};

// * The Export
// * ========================================
module.exports = orm;
