const banks = {
    '55': { 'bankName': 'Banque Saudi Fransi', 'nameEn': 'Banque Saudi Fransi', 'nameAr': 'البنك السعودي الفرنسي' },
    '80': { 'bankName': 'Alrajhi Bank', 'nameEn': 'Alrajhi Bank', 'nameAr': 'بنك الراجحي' },
    '10': { 'bankName': 'National Commercial Bank', 'nameEn': 'National Commercial Bank', 'nameAr': 'البنك الأهلي التجاري' },
    '45': { 'bankName': 'Saudi British Bank', 'nameEn': 'SABB', 'nameAr': 'ساب' },
    '20': { 'bankName': 'Riyadh Bank', 'nameEn': 'Riyad Bank', 'nameAr': 'بنك الرياض' },
    '40': { 'bankName': 'Saudi American Bank', 'nameEn': 'SAMBA', 'nameAr': 'سامبا' },
    '05': { 'bankName': 'Alinma Bank', 'nameEn': 'AL Inma Bank', 'nameAr': 'بنك الانماء' },
    '50': { 'bankName': 'Alawwal Bank', 'nameEn': 'AlAwwal Bank', 'nameAr': 'البنك الأول' },
    '60': { 'bankName': 'Bank AlJazira', 'nameEn': 'Bank Aljazerah', 'nameAr': 'بنك الجزيرة' },
    '65': { 'bankName': 'Saudi Investment Bank', 'nameEn': 'Saudi Investment Bank', 'nameAr': 'البنك السعودي للأستثمار' },
    '15': { 'bankName': 'Bank AlBilad', 'nameEn': 'BANK ALBELAD', 'nameAr': 'بنك البلاد' },
    '30': { 'bankName': 'Arab National Bank', 'nameEn': 'Arab National Bank', 'nameAr': 'البنك العربي الوطني' },
    '90': { 'bankName': 'GULF Bank', 'nameEn': 'Gulf International Bank', 'nameAr': 'بنك الخليج' },
    '95': { 'bankName': 'Emirates Bank', 'nameEn': 'EMARITE BANK', 'nameAr': 'بنك الامارات' },
    '76': { 'bankName': 'Bank Muscat', 'nameEn': 'Bank Muscat', 'nameAr': 'بنك مسقط' },
    '71': { 'bankName': 'National Bank of Bahrain', 'nameEn': 'National Bank Of Bahrain', 'nameAr': 'بنك البحرين الوطني' },
    '75': { 'bankName': 'National Bank of Kuwait', 'nameEn': 'National Bank of Kuwait', 'nameAr': 'بنك الكويت الوطني' },
    '85': { 'bankName': 'BNP Paribas Bank', 'nameEn': 'BNP PARIBAS SAUDI ARABIA', 'nameAr': 'بي ان بي باريبوس' }
};

document.getElementById('ibanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const ibanInput = document.getElementById('ibanInput').value.trim();
    const resultDiv = document.getElementById('result');

    // Remove spaces from the IBAN for validation
    const sanitizedIban = ibanInput.replaceAll(' ', '');

    // Validate IBAN format: starts with "SA", is 24 characters long
    if (!sanitizedIban.startsWith('SA') || sanitizedIban.length !== 24) {
        resultDiv.textContent = 'Invalid IBAN. It must start with "SA" and be exactly 24 characters long.';
        return;
    }

    // Break down IBAN components
    const countryCode = sanitizedIban.slice(0, 2); // First 2 letters
    const checkNumber = sanitizedIban.slice(2, 4); // Next 2 digits
    const bankCode = sanitizedIban.slice(4, 6); // Next 2 characters
    const accountNumber = sanitizedIban.slice(6); // Remaining 18 characters

    // Check if the bank exists
    let bankNameEn = '';
    let bankNameAr = '';
    let bankFound = false;

    if (banks[bankCode]) {
        bankFound = true;
        bankNameEn = banks[bankCode].nameEn || 'Unknown (English)';
        bankNameAr = banks[bankCode].nameAr || 'غير معروف (عربي)';
    }

    // Display result
    if (bankFound) {
        resultDiv.innerHTML = `
            <p>Bank Name: ${bankNameEn} (${bankNameAr})</p>
            <p>IBAN Details:</p>
            <ul>
                <li>Country Code: ${countryCode}</li>
                <li>Check Number: ${checkNumber}</li>
                <li>Bank Code: ${bankCode}</li>
                <li>Account Number: ${accountNumber}</li>
            </ul>
        `;
    } else {
        resultDiv.textContent = 'Bank not found or invalid IBAN.';
    }
});
