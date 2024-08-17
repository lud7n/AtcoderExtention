// ==UserScript==
// @name         AtCoder Result Text Changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AtCoderの判定結果のテキストを煽り口調に変更します
// @author       You
// @match        https://atcoder.jp/contests/*/submissions*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const resultMap = {
        'AC': 'おっそ（笑）',
        'WA': '雑魚おつ（笑）',
        'TLE': '計算量知ってる？（笑）',
        'RE': 'お話にならない（笑）',
        'CE': 'ちょｗｗｗ',
        'MLE': 'メモリ制限超過',
        'OLE': '出力制限超過',
        'IE': '内部エラー'
    };

    function changeResultText() {
        const labels = document.getElementsByClassName('label');
        for (let label of labels) {
            for (let [original, newText] of Object.entries(resultMap)) {
                if (label.textContent.includes(original)) {
                    label.textContent = newText;
                    break;
                }
            }
        }
    }

    // 初回実行
    changeResultText();

    // 動的な変更を監視
    const observer = new MutationObserver(changeResultText);
    const target = document.getElementsByTagName('tbody')[0];
    observer.observe(target, {
        childList: true,
        subtree: true
    });
})();
