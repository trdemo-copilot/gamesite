// i18n.js - Internationalization module
// 由AI生成，请务必仔细验证

const translations = {
    en: {
        'page-title': 'Number Guessing Game',
        'game-title': 'Number Guessing Game',
        'game-description': 'I have chosen a random number between 1 and 100. Can you guess it? Try to find it in as few attempts as possible!',
        'attempts-label': 'Attempts:',
        'range-label': 'Range:',
        'submit-btn': 'Submit',
        'reset-btn': 'New Game',
        'history-title': 'Guess History',
        'footer-text': 'A demo for GitHub Copilot Workspace with multi-language support',
        'placeholder': 'Enter your guess',
        'message-too-low': 'Too low! Try a higher number.',
        'message-too-high': 'Too high! Try a lower number.',
        'message-correct': 'Congratulations! You guessed it in {attempts} attempts!',
        'message-invalid': 'Please enter a valid number between 1 and 100.',
        'message-welcome': 'Welcome! Make your first guess.',
        'guess-format': 'Guess #{number}: {guess}'
    },
    zh: {
        'page-title': '猜数字游戏',
        'game-title': '猜数字游戏',
        'game-description': '我已经选择了一个1到100之间的随机数字。你能猜到它吗？尝试用最少的次数找到它！',
        'attempts-label': '尝试次数：',
        'range-label': '范围：',
        'submit-btn': '提交',
        'reset-btn': '新游戏',
        'history-title': '猜测历史',
        'footer-text': 'GitHub Copilot Workspace 多语言支持演示',
        'placeholder': '输入你的猜测',
        'message-too-low': '太小了！试试更大的数字。',
        'message-too-high': '太大了！试试更小的数字。',
        'message-correct': '恭喜！你用了 {attempts} 次尝试就猜对了！',
        'message-invalid': '请输入1到100之间的有效数字。',
        'message-welcome': '欢迎！开始你的第一次猜测吧。',
        'guess-format': '第{number}次猜测：{guess}'
    },
    ja: {
        'page-title': '数当てゲーム',
        'game-title': '数当てゲーム',
        'game-description': '1から100までのランダムな数字を選びました。当てられますか？できるだけ少ない試行回数で見つけてください！',
        'attempts-label': '試行回数：',
        'range-label': '範囲：',
        'submit-btn': '送信',
        'reset-btn': '新しいゲーム',
        'history-title': '推測履歴',
        'footer-text': 'GitHub Copilot Workspace 多言語サポートデモ',
        'placeholder': '予想を入力',
        'message-too-low': '低すぎます！もっと大きい数字を試してください。',
        'message-too-high': '高すぎます！もっと小さい数字を試してください。',
        'message-correct': 'おめでとうございます！{attempts}回の試行で当てました！',
        'message-invalid': '1から100の間の有効な数字を入力してください。',
        'message-welcome': 'ようこそ！最初の予想をしてください。',
        'guess-format': '推測#{number}：{guess}'
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.translations = translations;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            this.updatePageContent();
            this.updateActiveLangButton();
            // Dispatch event for other components to react to language change
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    }

    translate(key, params = {}) {
        let text = this.translations[this.currentLang][key] || this.translations['en'][key] || key;
        
        // Replace parameters in the translation
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }

    updatePageContent() {
        // Update all elements with id that has translation
        Object.keys(this.translations[this.currentLang]).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = this.translate(key);
                } else {
                    element.textContent = this.translate(key);
                }
            }
        });

        // Update document title
        document.title = this.translate('page-title');
        
        // Update input placeholder separately since it uses a different key than its id
        const guessInput = document.getElementById('guess-input');
        if (guessInput) {
            guessInput.placeholder = this.translate('placeholder');
        }
    }

    updateActiveLangButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    init() {
        // Set up language switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });

        // Initialize the page with current language
        this.updatePageContent();
        this.updateActiveLangButton();
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}
