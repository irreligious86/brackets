module.exports = function check(str, bracketsConfig) {
    var stack = [];
    for (var i = 0; i <= str.length - 1; i++) {
        var find = false;
        for (var j = 0; j < bracketsConfig.length; j++) {
            if (str[i] === bracketsConfig[j][0]) {
                find = true;
                if (bracketsConfig[j][0] === bracketsConfig[j][1]) {
                    if (stack[stack.length - 1] === bracketsConfig[j][0]) {
                        stack.pop();
                        break; 
                    }
                }
                stack.push(bracketsConfig[j][1]);
            }
        }
        if (!find) {
            if (stack.length === 0 || str[i] !== stack[stack.length - 1]) {
                return false;
            }
            stack.pop();
        }
    }
    return (stack.length === 0);
}




check('()', [['(', ')']]) // -> true

check(
  '((()))()', 
  [['(', ')']]
  ) // -> true

check(
  '())(', 
  [['(', ')']]
  ) // -> false

check(
  '([{}])', 
  [['(', ')'], ['[', ']'], ['{', '}']]
  ) // -> true

check(
  '[(])', 
  [['(', ')'], ['[', ']']]
  ) // -> false

check(
  '[]()', 
  [['(', ')'], ['[', ']']]
  ) // -> true

check(
  '[]()(', 
  [['(', ')'], ['[', ']']]
  ) // -> false

// special case: opening and closing bracket can be the same :)

check('||', [['|', '|']]) // -> true
check('|()|', [['(', ')'], ['|', '|']]) // -> true
check('|(|)', [['(', ')'], ['|', '|']]) // -> false
check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true