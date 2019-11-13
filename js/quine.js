const database = [{q: 'F(A,B,C,D,E)= &#931;m (0,1,2,3,6,8,9,10,11,17,20,21,23,25,28,30,31)', a: "A'C' + A'B'DE' + C'D'E + AB'CD' + ACDE + ABCE'"},
{q: 'F(A,B,C,D,E)= &#931;m (0,1,2,9,11,12,13,27,28,29)', a: "BCD' + A'B'C'E' + A'C'D'E' + BC'DE'}"},
{q: 'F(A,B,C,D,E)= &#931;m (0,2,6,7,8,10,12,14,15,41)', a: "A'B'D'F' + A'B'CF + A'B'DE + A'BCD'E'F"},
{q: "F = ABCD + A'B'CD + ABC'D' + AB'CD' + A'B'C'D + A'BCD + ABCD' + AB'CD'", a: "ABD' + AC + CD + DA'B'"},
{q: "F = A'B'CD' + ABCD + A'BCD + A'BC'D + ABCD' + A'BCD' + ABC'D' + AB'C'D", a:"(ABD' + ADB'C' + BC + BDA' + CA'D')"},
{q: "A'B'C'D' + A'BC'D + ABCD + A'B'CD + ABC'D +A'B'CD + A'B'C'D + AB'CD", a: "(ABD + BCD' + DC' + A'B'C')"}];

function createQuestion() {
	makeQuestion("Simplify the following boolean expression (preferably using Quine McCluskey Technique)", "qmain");
}