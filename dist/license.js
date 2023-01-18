import fs from 'fs';
export class License {
    constructor(name, identifier, shortIdentifier) {
        this.name = name;
        this.identifier = identifier;
        this.shortIdentifier = shortIdentifier;
        this.url = `https://spdx.org/licenses/${identifier}.html`;
    }
    static fromFile(file) {
        const text = fs.readFileSync(file, 'utf8');
        return License.fromText(text);
    }
    static fromText(text) {
        console.log(/GPL-3.0|GNU(.)General(.)Public(.)License(.)v3.0(.)only/i.test(text));
        for (const l of licenses) {
            if (l.regex.test(text)) {
                return new License(l.name, l.identifier, l.shortIdentifier);
            }
        }
        throw new Error('No license found in text');
    }
}
const licenses = [
    {
        name: '3dfx Glide License',
        identifier: 'Glide',
        shortIdentifier: 'Glide',
        osiApproved: false,
        regex: /Glide|3dfx(.)Glide(.)License/i
    },
    {
        name: 'Abstyles License',
        identifier: 'Abstyles',
        shortIdentifier: 'Abstyles',
        osiApproved: false,
        regex: /Abstyles|Abstyles(.)License/i
    },
    {
        name: 'Academic Free License v1.1',
        identifier: 'AFL-1.1',
        shortIdentifier: 'AFL',
        osiApproved: true,
        regex: /AFL-1.1|Academic(.)Free(.)License(.)v1.1/i
    },
    {
        name: 'Academic Free License v1.2',
        identifier: 'AFL-1.2',
        shortIdentifier: 'AFL',
        osiApproved: true,
        regex: /AFL-1.2|Academic(.)Free(.)License(.)v1.2/i
    },
    {
        name: 'Academic Free License v2.0',
        identifier: 'AFL-2.0',
        shortIdentifier: 'AFL',
        osiApproved: true,
        regex: /AFL-2.0|Academic(.)Free(.)License(.)v2.0/i
    },
    {
        name: 'Academic Free License v2.1',
        identifier: 'AFL-2.1',
        shortIdentifier: 'AFL',
        osiApproved: true,
        regex: /AFL-2.1|Academic(.)Free(.)License(.)v2.1/i
    },
    {
        name: 'Academic Free License v3.0',
        identifier: 'AFL-3.0',
        shortIdentifier: 'AFL',
        osiApproved: true,
        regex: /AFL-3.0|Academic(.)Free(.)License(.)v3.0/i
    },
    {
        name: 'Academy of Motion Picture Arts and Sciences BSD',
        identifier: 'AMPAS',
        shortIdentifier: 'AMPAS',
        osiApproved: false,
        regex: /AMPAS|Academy(.)of(.)Motion(.)Picture(.)Arts(.)and(.)Sciences(.)BSD/i
    },
    {
        name: 'Adaptive Public License 1.0',
        identifier: 'APL-1.0',
        shortIdentifier: 'APL',
        osiApproved: true,
        regex: /APL-1.0|Adaptive(.)Public(.)License(.)1.0/i
    },
    {
        name: 'Adobe Glyph List License',
        identifier: 'Adobe-Glyph',
        shortIdentifier: 'Adobe-Glyph',
        osiApproved: false,
        regex: /Adobe-Glyph|Adobe(.)Glyph(.)List(.)License|Adobe-Glyph/i
    },
    {
        name: 'Adobe Postscript AFM License',
        identifier: 'APAFML',
        shortIdentifier: 'APAFML',
        osiApproved: false,
        regex: /APAFML|Adobe(.)Postscript(.)AFM(.)License/i
    },
    {
        name: 'Adobe Systems Incorporated Source Code License Agreement',
        identifier: 'Adobe-2006',
        shortIdentifier: 'Adobe',
        osiApproved: false,
        regex: /Adobe-2006|Adobe(.)Systems(.)Incorporated(.)Source(.)Code(.)License(.)Agreement/i
    },
    {
        name: 'Affero General Public License v1.0',
        identifier: 'AGPL-1.0',
        shortIdentifier: 'AGPL',
        osiApproved: false,
        regex: /AGPL-1.0|Affero(.)General(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Afmparse License',
        identifier: 'Afmparse',
        shortIdentifier: 'Afmparse',
        osiApproved: false,
        regex: /Afmparse|Afmparse(.)License/i
    },
    {
        name: 'Aladdin Free Public License',
        identifier: 'Aladdin',
        shortIdentifier: 'Aladdin',
        osiApproved: false,
        regex: /Aladdin|Aladdin(.)Free(.)Public(.)License/i
    },
    {
        name: 'Amazon Digital Services License',
        identifier: 'ADSL',
        shortIdentifier: 'ADSL',
        osiApproved: false,
        regex: /ADSL|Amazon(.)Digital(.)Services(.)License/i
    },
    {
        name: "AMD's plpa_map.c License",
        identifier: 'AMDPLPA',
        shortIdentifier: 'AMDPLPA',
        osiApproved: false,
        regex: /AMDPLPA|AMD's(.)plpa_map.c(.)License/i
    },
    {
        name: 'ANTLR Software Rights Notice',
        identifier: 'ANTLR-PD',
        shortIdentifier: 'ANTLR-PD',
        osiApproved: false,
        regex: /ANTLR-PD|ANTLR(.)Software(.)Rights(.)Notice|ANTLR-PD/i
    },
    {
        name: 'Apache License 1.0',
        identifier: 'Apache-1.0',
        shortIdentifier: 'Apache',
        osiApproved: false,
        regex: /Apache-1.0|Apache(.)License(.)1.0/i
    },
    {
        name: 'Apache License 1.1',
        identifier: 'Apache-1.1',
        shortIdentifier: 'Apache',
        osiApproved: true,
        regex: /Apache-1.1|Apache(.)License(.)1.1/i
    },
    {
        name: 'Apache License 2.0',
        identifier: 'Apache-2.0',
        shortIdentifier: 'Apache',
        osiApproved: true,
        regex: /Apache-2.0|Apache(.)License(.)2.0/i
    },
    {
        name: 'Apple MIT License',
        identifier: 'AML',
        shortIdentifier: 'AML',
        osiApproved: false,
        regex: /AML|Apple(.)MIT(.)License/i
    },
    {
        name: 'Apple Public Source License 1.0',
        identifier: 'APSL-1.0',
        shortIdentifier: 'APSL',
        osiApproved: true,
        regex: /APSL-1.0|Apple(.)Public(.)Source(.)License(.)1.0/i
    },
    {
        name: 'Apple Public Source License 1.1',
        identifier: 'APSL-1.1',
        shortIdentifier: 'APSL',
        osiApproved: true,
        regex: /APSL-1.1|Apple(.)Public(.)Source(.)License(.)1.1/i
    },
    {
        name: 'Apple Public Source License 1.2',
        identifier: 'APSL-1.2',
        shortIdentifier: 'APSL',
        osiApproved: true,
        regex: /APSL-1.2|Apple(.)Public(.)Source(.)License(.)1.2/i
    },
    {
        name: 'Apple Public Source License 2.0',
        identifier: 'APSL-2.0',
        shortIdentifier: 'APSL',
        osiApproved: true,
        regex: /APSL-2.0|Apple(.)Public(.)Source(.)License(.)2.0/i
    },
    {
        name: 'Artistic License 1.0',
        identifier: 'Artistic-1.0',
        shortIdentifier: 'Artistic',
        osiApproved: true,
        regex: /Artistic-1.0|Artistic(.)License(.)1.0/i
    },
    {
        name: 'Artistic License 1.0 (Perl)',
        identifier: 'Artistic-1.0-Perl',
        shortIdentifier: 'Artistic',
        osiApproved: true,
        regex: /Artistic-1.0-Perl|Artistic(.)License(.)1.0(.)(Perl)/i
    },
    {
        name: 'Artistic License 1.0 w/clause 8',
        identifier: 'Artistic-1.0-cl8',
        shortIdentifier: 'Artistic',
        osiApproved: true,
        regex: /Artistic-1.0-cl8|Artistic(.)License(.)1.0(.)w\/clause(.)8/i
    },
    {
        name: 'Artistic License 2.0',
        identifier: 'Artistic-2.0',
        shortIdentifier: 'Artistic',
        osiApproved: true,
        regex: /Artistic-2.0|Artistic(.)License(.)2.0/i
    },
    {
        name: 'Attribution Assurance License',
        identifier: 'AAL',
        shortIdentifier: 'AAL',
        osiApproved: true,
        regex: /AAL|Attribution(.)Assurance(.)License/i
    },
    {
        name: 'Bahyph License',
        identifier: 'Bahyph',
        shortIdentifier: 'Bahyph',
        osiApproved: false,
        regex: /Bahyph|Bahyph(.)License/i
    },
    {
        name: 'Barr License',
        identifier: 'Barr',
        shortIdentifier: 'Barr',
        osiApproved: false,
        regex: /Barr|Barr(.)License/i
    },
    {
        name: 'Beerware License',
        identifier: 'Beerware',
        shortIdentifier: 'Beerware',
        osiApproved: false,
        regex: /Beerware|Beerware(.)License/i
    },
    {
        name: 'BitTorrent Open Source License v1.0',
        identifier: 'BitTorrent-1.0',
        shortIdentifier: 'BitTorrent',
        osiApproved: false,
        regex: /BitTorrent-1.0|BitTorrent(.)Open(.)Source(.)License(.)v1.0/i
    },
    {
        name: 'BitTorrent Open Source License v1.1',
        identifier: 'BitTorrent-1.1',
        shortIdentifier: 'BitTorrent',
        osiApproved: false,
        regex: /BitTorrent-1.1|BitTorrent(.)Open(.)Source(.)License(.)v1.1/i
    },
    {
        name: 'Boost Software License 1.0',
        identifier: 'BSL-1.0',
        shortIdentifier: 'BSL',
        osiApproved: true,
        regex: /BSL-1.0|Boost(.)Software(.)License(.)1.0/i
    },
    {
        name: 'Borceux license',
        identifier: 'Borceux',
        shortIdentifier: 'Borceux',
        osiApproved: false,
        regex: /Borceux|Borceux(.)license/i
    },
    {
        name: '"BSD 2-clause ""Simplified"" License"',
        identifier: 'BSD-2-Clause',
        shortIdentifier: 'BSD',
        osiApproved: true,
        regex: /BSD-2-Clause|\"BSD(.)2-clause(.)\"\"Simplified\"\"(.)License\"/i
    },
    {
        name: 'BSD 2-clause FreeBSD License',
        identifier: 'BSD-2-Clause-FreeBSD',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-2-Clause-FreeBSD|BSD(.)2-clause(.)FreeBSD(.)License/i
    },
    {
        name: 'BSD 2-clause NetBSD License',
        identifier: 'BSD-2-Clause-NetBSD',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-2-Clause-NetBSD|BSD(.)2-clause(.)NetBSD(.)License/i
    },
    {
        name: '"BSD 3-clause ""New"" or ""Revised"" License"',
        identifier: 'BSD-3-Clause',
        shortIdentifier: 'BSD',
        osiApproved: true,
        regex: /BSD-3-Clause|\"BSD(.)3-clause(.)\"\"New\"\"(.)or(.)\"\"Revised\"\"(.)License\"/i
    },
    {
        name: 'BSD 3-clause Clear License',
        identifier: 'BSD-3-Clause-Clear',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-3-Clause-Clear|BSD(.)3-clause(.)Clear(.)License/i
    },
    {
        name: '"BSD 4-clause ""Original"" or ""Old"" License"',
        identifier: 'BSD-4-Clause',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-4-Clause|\"BSD(.)4-clause(.)\"\"Original\"\"(.)or(.)\"\"Old\"\"(.)License\"/i
    },
    {
        name: 'BSD Protection License',
        identifier: 'BSD-Protection',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-Protection|BSD(.)Protection(.)License/i
    },
    {
        name: 'BSD with attribution',
        identifier: 'BSD-3-Clause-Attribution',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-3-Clause-Attribution|BSD(.)with(.)attribution/i
    },
    {
        name: 'BSD Zero Clause License',
        identifier: '0BSD',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /0BSD|BSD(.)Zero(.)Clause(.)License/i
    },
    {
        name: 'BSD-4-Clause (University of California-Specific)',
        identifier: 'BSD-4-Clause-UC',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-4-Clause-UC|BSD-4-Clause(.)(University(.)of(.)California-Specific)/i
    },
    {
        name: 'bzip2 and libbzip2 License v1.0.5',
        identifier: 'bzip2-1.0.5',
        shortIdentifier: 'bzip2',
        osiApproved: false,
        regex: /bzip2-1.0.5|bzip2(.)and(.)libbzip2(.)License(.)v1.0.5/i
    },
    {
        name: 'bzip2 and libbzip2 License v1.0.6',
        identifier: 'bzip2-1.0.6',
        shortIdentifier: 'bzip2',
        osiApproved: false,
        regex: /bzip2-1.0.6|bzip2(.)and(.)libbzip2(.)License(.)v1.0.6/i
    },
    {
        name: 'Caldera License',
        identifier: 'Caldera',
        shortIdentifier: 'Caldera',
        osiApproved: false,
        regex: /Caldera|Caldera(.)License/i
    },
    {
        name: 'CeCILL Free Software License Agreement v1.0',
        identifier: 'CECILL-1.0',
        shortIdentifier: 'CECILL',
        osiApproved: false,
        regex: /CECILL-1.0|CeCILL(.)Free(.)Software(.)License(.)Agreement(.)v1.0/i
    },
    {
        name: 'CeCILL Free Software License Agreement v1.1',
        identifier: 'CECILL-1.1',
        shortIdentifier: 'CECILL',
        osiApproved: false,
        regex: /CECILL-1.1|CeCILL(.)Free(.)Software(.)License(.)Agreement(.)v1.1/i
    },
    {
        name: 'CeCILL Free Software License Agreement v2.0',
        identifier: 'CECILL-2.0',
        shortIdentifier: 'CECILL',
        osiApproved: false,
        regex: /CECILL-2.0|CeCILL(.)Free(.)Software(.)License(.)Agreement(.)v2.0/i
    },
    {
        name: 'CeCILL Free Software License Agreement v2.1',
        identifier: 'CECILL-2.1',
        shortIdentifier: 'CECILL',
        osiApproved: true,
        regex: /CECILL-2.1|CeCILL(.)Free(.)Software(.)License(.)Agreement(.)v2.1/i
    },
    {
        name: 'CeCILL-B Free Software License Agreement',
        identifier: 'CECILL-B',
        shortIdentifier: 'CECILL',
        osiApproved: false,
        regex: /CECILL-B|CeCILL-B(.)Free(.)Software(.)License(.)Agreement/i
    },
    {
        name: 'CeCILL-C Free Software License Agreement',
        identifier: 'CECILL-C',
        shortIdentifier: 'CECILL',
        osiApproved: false,
        regex: /CECILL-C|CeCILL-C(.)Free(.)Software(.)License(.)Agreement/i
    },
    {
        name: 'Clarified Artistic License',
        identifier: 'ClArtistic',
        shortIdentifier: 'CIArtistic',
        osiApproved: false,
        regex: /ClArtistic|Clarified(.)Artistic(.)License/i
    },
    {
        name: 'CMU License',
        identifier: 'MIT-CMU',
        shortIdentifier: 'MIT-CMU',
        osiApproved: false,
        regex: /MIT-CMU|CMU(.)License|MIT-CMU/i
    },
    {
        name: 'CNRI Jython License',
        identifier: 'CNRI-Jython',
        shortIdentifier: 'CNRI',
        osiApproved: false,
        regex: /CNRI-Jython|CNRI(.)Jython(.)License/i
    },
    {
        name: 'CNRI Python License',
        identifier: 'CNRI-Python',
        shortIdentifier: 'CNRI',
        osiApproved: true,
        regex: /CNRI-Python|CNRI(.)Python(.)License/i
    },
    {
        name: 'CNRI Python Open Source GPL Compatible License Agreement',
        identifier: 'CNRI-Python-GPL-Compatible',
        shortIdentifier: 'CNRI',
        osiApproved: false,
        regex: /CNRI-Python-GPL-Compatible|CNRI(.)Python(.)Open(.)Source(.)GPL(.)Compatible(.)License(.)Agreement/i
    },
    {
        name: 'Code Project Open License 1.02',
        identifier: 'CPOL-1.02',
        shortIdentifier: 'CPOL',
        osiApproved: false,
        regex: /CPOL-1.02|Code(.)Project(.)Open(.)License(.)1.02/i
    },
    {
        name: 'Common Development and Distribution License 1.0',
        identifier: 'CDDL-1.0',
        shortIdentifier: 'CDDL',
        osiApproved: true,
        regex: /CDDL-1.0|Common(.)Development(.)and(.)Distribution(.)License(.)1.0/i
    },
    {
        name: 'Common Development and Distribution License 1.1',
        identifier: 'CDDL-1.1',
        shortIdentifier: 'CDDL',
        osiApproved: false,
        regex: /CDDL-1.1|Common(.)Development(.)and(.)Distribution(.)License(.)1.1/i
    },
    {
        name: 'Common Public Attribution License 1.0',
        identifier: 'CPAL-1.0',
        shortIdentifier: 'CPAL',
        osiApproved: true,
        regex: /CPAL-1.0|Common(.)Public(.)Attribution(.)License(.)1.0/i
    },
    {
        name: 'Common Public License 1.0',
        identifier: 'CPL-1.0',
        shortIdentifier: 'CPL',
        osiApproved: true,
        regex: /CPL-1.0|Common(.)Public(.)License(.)1.0/i
    },
    {
        name: 'Computer Associates Trusted Open Source License 1.1',
        identifier: 'CATOSL-1.1',
        shortIdentifier: 'CATOSL',
        osiApproved: true,
        regex: /CATOSL-1.1|Computer(.)Associates(.)Trusted(.)Open(.)Source(.)License(.)1.1/i
    },
    {
        name: 'Condor Public License v1.1',
        identifier: 'Condor-1.1',
        shortIdentifier: 'Condo',
        osiApproved: false,
        regex: /Condor-1.1|Condor(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'Creative Commons Attribution 1.0',
        identifier: 'CC-BY-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-1.0|Creative(.)Commons(.)Attribution(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution 2.0',
        identifier: 'CC-BY-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-2.0|Creative(.)Commons(.)Attribution(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution 2.5',
        identifier: 'CC-BY-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-2.5|Creative(.)Commons(.)Attribution(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution 3.0',
        identifier: 'CC-BY-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-3.0|Creative(.)Commons(.)Attribution(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution 4.0',
        identifier: 'CC-BY-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-4.0|Creative(.)Commons(.)Attribution(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution No Derivatives 1.0',
        identifier: 'CC-BY-ND-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-ND-1.0|Creative(.)Commons(.)Attribution(.)No(.)Derivatives(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution No Derivatives 2.0',
        identifier: 'CC-BY-ND-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-ND-2.0|Creative(.)Commons(.)Attribution(.)No(.)Derivatives(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution No Derivatives 2.5',
        identifier: 'CC-BY-ND-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-ND-2.5|Creative(.)Commons(.)Attribution(.)No(.)Derivatives(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution No Derivatives 3.0',
        identifier: 'CC-BY-ND-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-ND-3.0|Creative(.)Commons(.)Attribution(.)No(.)Derivatives(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution No Derivatives 4.0',
        identifier: 'CC-BY-ND-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-ND-4.0|Creative(.)Commons(.)Attribution(.)No(.)Derivatives(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial 1.0',
        identifier: 'CC-BY-NC-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-1.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial 2.0',
        identifier: 'CC-BY-NC-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-2.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial 2.5',
        identifier: 'CC-BY-NC-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-2.5|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial 3.0',
        identifier: 'CC-BY-NC-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-3.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial 4.0',
        identifier: 'CC-BY-NC-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-4.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial No Derivatives 1.0',
        identifier: 'CC-BY-NC-ND-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-ND-1.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)No(.)Derivatives(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial No Derivatives 2.0',
        identifier: 'CC-BY-NC-ND-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-ND-2.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)No(.)Derivatives(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial No Derivatives 2.5',
        identifier: 'CC-BY-NC-ND-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-ND-2.5|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)No(.)Derivatives(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial No Derivatives 3.0',
        identifier: 'CC-BY-NC-ND-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-ND-3.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)No(.)Derivatives(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial No Derivatives 4.0',
        identifier: 'CC-BY-NC-ND-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-ND-4.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)No(.)Derivatives(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial Share Alike 1.0',
        identifier: 'CC-BY-NC-SA-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-SA-1.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)Share(.)Alike(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial Share Alike 2.0',
        identifier: 'CC-BY-NC-SA-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-SA-2.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)Share(.)Alike(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial Share Alike 2.5',
        identifier: 'CC-BY-NC-SA-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-SA-2.5|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)Share(.)Alike(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial Share Alike 3.0',
        identifier: 'CC-BY-NC-SA-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-SA-3.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)Share(.)Alike(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Non Commercial Share Alike 4.0',
        identifier: 'CC-BY-NC-SA-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-NC-SA-4.0|Creative(.)Commons(.)Attribution(.)Non(.)Commercial(.)Share(.)Alike(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Share Alike 1.0',
        identifier: 'CC-BY-SA-1.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-SA-1.0|Creative(.)Commons(.)Attribution(.)Share(.)Alike(.)1.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Share Alike 2.0',
        identifier: 'CC-BY-SA-2.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-SA-2.0|Creative(.)Commons(.)Attribution(.)Share(.)Alike(.)2.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Share Alike 2.5',
        identifier: 'CC-BY-SA-2.5',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-SA-2.5|Creative(.)Commons(.)Attribution(.)Share(.)Alike(.)2.5|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Share Alike 3.0',
        identifier: 'CC-BY-SA-3.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-SA-3.0|Creative(.)Commons(.)Attribution(.)Share(.)Alike(.)3.0|CC-BY/i
    },
    {
        name: 'Creative Commons Attribution Share Alike 4.0',
        identifier: 'CC-BY-SA-4.0',
        shortIdentifier: 'CC-BY',
        osiApproved: false,
        regex: /CC-BY-SA-4.0|Creative(.)Commons(.)Attribution(.)Share(.)Alike(.)4.0|CC-BY/i
    },
    {
        name: 'Creative Commons Zero v1.0 Universal',
        identifier: 'CC0-1.0',
        shortIdentifier: 'CC0',
        osiApproved: false,
        regex: /CC0-1.0|Creative(.)Commons(.)Zero(.)v1.0(.)Universal/i
    },
    {
        name: 'Crossword License',
        identifier: 'Crossword',
        shortIdentifier: 'Crossword',
        osiApproved: false,
        regex: /Crossword|Crossword(.)License/i
    },
    {
        name: 'CrystalStacker License',
        identifier: 'CrystalStacker',
        shortIdentifier: 'CrystalStacker',
        osiApproved: false,
        regex: /CrystalStacker|CrystalStacker(.)License/i
    },
    {
        name: 'CUA Office Public License v1.0',
        identifier: 'CUA-OPL-1.0',
        shortIdentifier: 'CUA-OPL',
        osiApproved: true,
        regex: /CUA-OPL-1.0|CUA(.)Office(.)Public(.)License(.)v1.0|CUA-OPL/i
    },
    {
        name: 'Cube License',
        identifier: 'Cube',
        shortIdentifier: 'Cube',
        osiApproved: false,
        regex: /Cube|Cube(.)License/i
    },
    {
        name: 'curl License',
        identifier: 'curl',
        shortIdentifier: 'curl',
        osiApproved: false,
        regex: /curl|curl(.)License/i
    },
    {
        name: 'Deutsche Freie Software Lizenz',
        identifier: 'D-FSL-1.0',
        shortIdentifier: 'D-FSL',
        osiApproved: false,
        regex: /D-FSL-1.0|Deutsche(.)Freie(.)Software(.)Lizenz|D-FSL/i
    },
    {
        name: 'diffmark license',
        identifier: 'diffmark',
        shortIdentifier: 'diffmark',
        osiApproved: false,
        regex: /diffmark|diffmark(.)license/i
    },
    {
        name: 'Do What The F*ck You Want To Public License',
        identifier: 'WTFPL',
        shortIdentifier: 'WTFPL',
        osiApproved: false,
        regex: /WTFPL|Do(.)What(.)The(.)F*ck(.)You(.)Want(.)To(.)Public(.)License/i
    },
    {
        name: 'DOC License',
        identifier: 'DOC',
        shortIdentifier: 'DOC',
        osiApproved: false,
        regex: /DOC(.)License/i
    },
    {
        name: 'Dotseqn License',
        identifier: 'Dotseqn',
        shortIdentifier: 'Dotseqn',
        osiApproved: false,
        regex: /Dotseqn|Dotseqn(.)License/i
    },
    {
        name: 'DSDP License',
        identifier: 'DSDP',
        shortIdentifier: 'DSDP',
        osiApproved: false,
        regex: /DSDP|DSDP(.)License/i
    },
    {
        name: 'dvipdfm License',
        identifier: 'dvipdfm',
        shortIdentifier: 'dvipdfm',
        osiApproved: false,
        regex: /dvipdfm|dvipdfm(.)License/i
    },
    {
        name: 'Eclipse Public License 1.0',
        identifier: 'EPL-1.0',
        shortIdentifier: 'EPL',
        osiApproved: true,
        regex: /EPL-1.0|Eclipse(.)Public(.)License(.)1.0/i
    },
    {
        name: 'Educational Community License v1.0',
        identifier: 'ECL-1.0',
        shortIdentifier: 'ECL',
        osiApproved: true,
        regex: /ECL-1.0|Educational(.)Community(.)License(.)v1.0/i
    },
    {
        name: 'Educational Community License v2.0',
        identifier: 'ECL-2.0',
        shortIdentifier: 'ECL',
        osiApproved: true,
        regex: /ECL-2.0|Educational(.)Community(.)License(.)v2.0/i
    },
    {
        name: 'eGenix.com Public License 1.1.0',
        identifier: 'eGenix',
        shortIdentifier: 'eGenix',
        osiApproved: false,
        regex: /eGenix|eGenix.com(.)Public(.)License(.)1.1.0/i
    },
    {
        name: 'Eiffel Forum License v1.0',
        identifier: 'EFL-1.0',
        shortIdentifier: 'EFL',
        osiApproved: true,
        regex: /EFL-1.0|Eiffel(.)Forum(.)License(.)v1.0/i
    },
    {
        name: 'Eiffel Forum License v2.0',
        identifier: 'EFL-2.0',
        shortIdentifier: 'EFL',
        osiApproved: true,
        regex: /EFL-2.0|Eiffel(.)Forum(.)License(.)v2.0/i
    },
    {
        name: 'Enlightenment License (e16)',
        identifier: 'MIT-advertising',
        shortIdentifier: 'MIT-advertising',
        osiApproved: false,
        regex: /MIT-advertising|Enlightenment(.)License(.)(e16)|MIT-advertising/i
    },
    {
        name: 'enna License',
        identifier: 'MIT-enna',
        shortIdentifier: 'MIT-enna',
        osiApproved: false,
        regex: /MIT-enna|enna(.)License|MIT-enna/i
    },
    {
        name: 'Entessa Public License v1.0',
        identifier: 'Entessa',
        shortIdentifier: 'Entessa',
        osiApproved: true,
        regex: /Entessa|Entessa(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Erlang Public License v1.1',
        identifier: 'ErlPL-1.1',
        shortIdentifier: 'ErlPL',
        osiApproved: false,
        regex: /ErlPL-1.1|Erlang(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'EU DataGrid Software License',
        identifier: 'EUDatagrid',
        shortIdentifier: 'EUDatagrid',
        osiApproved: true,
        regex: /EUDatagrid|EU(.)DataGrid(.)Software(.)License/i
    },
    {
        name: 'European Union Public License 1.0',
        identifier: 'EUPL-1.0',
        shortIdentifier: 'EUPL',
        osiApproved: false,
        regex: /EUPL-1.0|European(.)Union(.)Public(.)License(.)1.0/i
    },
    {
        name: 'European Union Public License 1.1',
        identifier: 'EUPL-1.1',
        shortIdentifier: 'EUPL',
        osiApproved: true,
        regex: /EUPL-1.1|European(.)Union(.)Public(.)License(.)1.1/i
    },
    {
        name: 'Eurosym License',
        identifier: 'Eurosym',
        shortIdentifier: 'Eurosym',
        osiApproved: false,
        regex: /Eurosym|Eurosym(.)License/i
    },
    {
        name: 'Fair License',
        identifier: 'Fair',
        shortIdentifier: 'Fair',
        osiApproved: true,
        regex: /Fair|Fair(.)License/i
    },
    {
        name: 'feh License',
        identifier: 'MIT-feh',
        shortIdentifier: 'MIT-feh',
        osiApproved: false,
        regex: /MIT-feh|feh(.)License|MIT-feh/i
    },
    {
        name: 'Frameworx Open License 1.0',
        identifier: 'Frameworx-1.0',
        shortIdentifier: 'Frameworx',
        osiApproved: true,
        regex: /Frameworx-1.0|Frameworx(.)Open(.)License(.)1.0/i
    },
    {
        name: 'FreeImage Public License v1.0',
        identifier: 'FreeImage',
        shortIdentifier: 'FreeImage',
        osiApproved: false,
        regex: /FreeImage|FreeImage(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Freetype Project License',
        identifier: 'FTL',
        shortIdentifier: 'FTL',
        osiApproved: false,
        regex: /FTL|Freetype(.)Project(.)License/i
    },
    {
        name: 'FSF Unlimited License',
        identifier: 'FSFUL',
        shortIdentifier: 'FSFUL',
        osiApproved: false,
        regex: /FSFUL|FSF(.)Unlimited(.)License/i
    },
    {
        name: 'FSF Unlimited License (with License Retention)',
        identifier: 'FSFULLR',
        shortIdentifier: 'FSFULLR',
        osiApproved: false,
        regex: /FSFULLR|FSF(.)Unlimited(.)License(.)(with(.)License(.)Retention)/i
    },
    {
        name: 'Giftware License',
        identifier: 'Giftware',
        shortIdentifier: 'Giftware',
        osiApproved: false,
        regex: /Giftware|Giftware(.)License/i
    },
    {
        name: 'GL2PS License',
        identifier: 'GL2PS',
        shortIdentifier: 'GL2PS',
        osiApproved: false,
        regex: /GL2PS|GL2PS(.)License/i
    },
    {
        name: 'Glulxe License',
        identifier: 'Glulxe',
        shortIdentifier: 'Glulxe',
        osiApproved: false,
        regex: /Glulxe|Glulxe(.)License/i
    },
    {
        name: 'GNU Affero General Public License v3.0',
        identifier: 'AGPL-3.0',
        shortIdentifier: 'AGPL',
        osiApproved: true,
        regex: /AGPL-3.0|GNU(.)Affero(.)General(.)Public(.)License(.)v3.0/i
    },
    {
        name: 'GNU Free Documentation License v1.1',
        identifier: 'GFDL-1.1',
        shortIdentifier: 'GFDL',
        osiApproved: false,
        regex: /GFDL-1.1|GNU(.)Free(.)Documentation(.)License(.)v1.1/i
    },
    {
        name: 'GNU Free Documentation License v1.2',
        identifier: 'GFDL-1.2',
        shortIdentifier: 'GFDL',
        osiApproved: false,
        regex: /GFDL-1.2|GNU(.)Free(.)Documentation(.)License(.)v1.2/i
    },
    {
        name: 'GNU Free Documentation License v1.3',
        identifier: 'GFDL-1.3',
        shortIdentifier: 'GFDL',
        osiApproved: false,
        regex: /GFDL-1.3|GNU(.)Free(.)Documentation(.)License(.)v1.3/i
    },
    {
        name: 'GNU General Public License v1.0 only',
        identifier: 'GPL-1.0',
        shortIdentifier: 'GPL',
        osiApproved: false,
        regex: /GPL-1.0|GNU(.)General(.)Public(.)License(.)v1.0(.)only/i
    },
    {
        name: 'GNU General Public License v2.0 only',
        identifier: 'GPL-2.0',
        shortIdentifier: 'GPL',
        osiApproved: true,
        regex: /GPL-2.0|GNU(.)General(.)Public(.)License(.)v2.0(.)only/i
    },
    {
        name: 'GNU General Public License v3.0 only',
        identifier: 'GPL-3.0',
        shortIdentifier: 'GPL',
        osiApproved: true,
        regex: /GPL-3.0|GNU(.)General(.)Public(.)License(.)v3.0(.)only/i
    },
    {
        name: 'GNU Lesser General Public License v2.1 only',
        identifier: 'LGPL-2.1',
        shortIdentifier: 'LGPL',
        osiApproved: true,
        regex: /LGPL-2.1|GNU(.)Lesser(.)General(.)Public(.)License(.)v2.1(.)only/i
    },
    {
        name: 'GNU Lesser General Public License v3.0 only',
        identifier: 'LGPL-3.0',
        shortIdentifier: 'LGPL',
        osiApproved: true,
        regex: /LGPL-3.0|GNU(.)Lesser(.)General(.)Public(.)License(.)v3.0(.)only/i
    },
    {
        name: 'GNU Library General Public License v2 only',
        identifier: 'LGPL-2.0',
        shortIdentifier: 'LGPL',
        osiApproved: true,
        regex: /LGPL-2.0|GNU(.)Library(.)General(.)Public(.)License(.)v2(.)only/i
    },
    {
        name: 'gnuplot License',
        identifier: 'gnuplot',
        shortIdentifier: 'gnuplot',
        osiApproved: false,
        regex: /gnuplot|gnuplot(.)License/i
    },
    {
        name: 'gSOAP Public License v1.3b',
        identifier: 'gSOAP-1.3b',
        shortIdentifier: 'gSOAP',
        osiApproved: false,
        regex: /gSOAP-1.3b|gSOAP(.)Public(.)License(.)v1.3b/i
    },
    {
        name: 'Haskell Language Report License',
        identifier: 'HaskellReport',
        shortIdentifier: 'HaskellReport',
        osiApproved: false,
        regex: /HaskellReport|Haskell(.)Language(.)Report(.)License/i
    },
    {
        name: 'Historic Permission Notice and Disclaimer',
        identifier: 'HPND',
        shortIdentifier: 'HPND',
        osiApproved: true,
        regex: /HPND|Historic(.)Permission(.)Notice(.)and(.)Disclaimer/i
    },
    {
        name: 'IBM PowerPC Initialization and Boot Software',
        identifier: 'IBM-pibs',
        shortIdentifier: 'IBM-pibs',
        osiApproved: false,
        regex: /IBM-pibs|IBM(.)PowerPC(.)Initialization(.)and(.)Boot(.)Software|IBM-pibs/i
    },
    {
        name: 'IBM Public License v1.0',
        identifier: 'IPL-1.0',
        shortIdentifier: 'IPL',
        osiApproved: true,
        regex: /IPL-1.0|IBM(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'ICU License',
        identifier: 'ICU',
        shortIdentifier: 'ICU',
        osiApproved: false,
        regex: /ICU(.)License/i
    },
    {
        name: 'ImageMagick License',
        identifier: 'ImageMagick',
        shortIdentifier: 'ImageMagick',
        osiApproved: false,
        regex: /ImageMagick|ImageMagick(.)License/i
    },
    {
        name: 'iMatix Standard Function Library Agreement',
        identifier: 'iMatix',
        shortIdentifier: 'iMatix',
        osiApproved: false,
        regex: /iMatix|iMatix(.)Standard(.)Function(.)Library(.)Agreement/i
    },
    {
        name: 'Imlib2 License',
        identifier: 'Imlib2',
        shortIdentifier: 'Imlib2',
        osiApproved: false,
        regex: /Imlib2|Imlib2(.)License/i
    },
    {
        name: 'Independent JPEG Group License',
        identifier: 'IJG',
        shortIdentifier: 'IJG',
        osiApproved: false,
        regex: /IJG|Independent(.)JPEG(.)Group(.)License/i
    },
    {
        name: 'Info-ZIP License',
        identifier: 'Info-ZIP',
        shortIdentifier: 'Info-ZIP',
        osiApproved: false,
        regex: /Info-ZIP|Info-ZIP(.)License|Info-ZIP/i
    },
    {
        name: 'Intel ACPI Software License Agreement',
        identifier: 'Intel-ACPI',
        shortIdentifier: 'Intel-ACPI',
        osiApproved: false,
        regex: /Intel-ACPI|Intel(.)ACPI(.)Software(.)License(.)Agreement|Intel-ACPI/i
    },
    {
        name: 'Intel Open Source License',
        identifier: 'Intel',
        shortIdentifier: 'Intel',
        osiApproved: true,
        regex: /Intel|Intel(.)Open(.)Source(.)License/i
    },
    {
        name: 'Interbase Public License v1.0',
        identifier: 'Interbase-1.0',
        shortIdentifier: 'Interbase',
        osiApproved: false,
        regex: /Interbase-1.0|Interbase(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'IPA Font License',
        identifier: 'IPA',
        shortIdentifier: 'IPA',
        osiApproved: true,
        regex: /IPA|IPA(.)Font(.)License/i
    },
    {
        name: 'ISC License',
        identifier: 'ISC',
        shortIdentifier: 'ISC',
        osiApproved: true,
        regex: /ISC(.)License/i
    },
    {
        name: 'JasPer License',
        identifier: 'JasPer-2.0',
        shortIdentifier: 'JasPer',
        osiApproved: false,
        regex: /JasPer-2.0|JasPer(.)License/i
    },
    {
        name: 'JSON License',
        identifier: 'JSON',
        shortIdentifier: 'JSON',
        osiApproved: false,
        regex: /JSON(.)License/i
    },
    {
        name: 'LaTeX Project Public License v1.0',
        identifier: 'LPPL-1.0',
        shortIdentifier: 'LPPL',
        osiApproved: false,
        regex: /LPPL-1.0|LaTeX(.)Project(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'LaTeX Project Public License v1.1',
        identifier: 'LPPL-1.1',
        shortIdentifier: 'LPPL',
        osiApproved: false,
        regex: /LPPL-1.1|LaTeX(.)Project(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'LaTeX Project Public License v1.2',
        identifier: 'LPPL-1.2',
        shortIdentifier: 'LPPL',
        osiApproved: false,
        regex: /LPPL-1.2|LaTeX(.)Project(.)Public(.)License(.)v1.2/i
    },
    {
        name: 'LaTeX Project Public License v1.3a',
        identifier: 'LPPL-1.3a',
        shortIdentifier: 'LPPL',
        osiApproved: false,
        regex: /LPPL-1.3a|LaTeX(.)Project(.)Public(.)License(.)v1.3a/i
    },
    {
        name: 'LaTeX Project Public License v1.3c',
        identifier: 'LPPL-1.3c',
        shortIdentifier: 'LPPL',
        osiApproved: true,
        regex: /LPPL-1.3c|LaTeX(.)Project(.)Public(.)License(.)v1.3c/i
    },
    {
        name: 'Latex2e License',
        identifier: 'Latex2e',
        shortIdentifier: 'Latex2e',
        osiApproved: false,
        regex: /Latex2e|Latex2e(.)License/i
    },
    {
        name: 'Lawrence Berkeley National Labs BSD variant license',
        identifier: 'BSD-3-Clause-LBNL',
        shortIdentifier: 'BSD',
        osiApproved: false,
        regex: /BSD-3-Clause-LBNL|Lawrence(.)Berkeley(.)National(.)Labs(.)BSD(.)variant(.)license/i
    },
    {
        name: 'Leptonica License',
        identifier: 'Leptonica',
        shortIdentifier: 'Leptonica',
        osiApproved: false,
        regex: /Leptonica|Leptonica(.)License/i
    },
    {
        name: 'Lesser General Public License For Linguistic Resources',
        identifier: 'LGPLLR',
        shortIdentifier: 'LGPLLR',
        osiApproved: false,
        regex: /LGPLLR|Lesser(.)General(.)Public(.)License(.)For(.)Linguistic(.)Resources/i
    },
    {
        name: 'libpng License',
        identifier: 'Libpng',
        shortIdentifier: 'Libpng',
        osiApproved: false,
        regex: /Libpng|libpng(.)License/i
    },
    {
        name: 'libtiff License',
        identifier: 'libtiff',
        shortIdentifier: 'libtiff',
        osiApproved: false,
        regex: /libtiff|libtiff(.)License/i
    },
    {
        name: 'Lucent Public License v1.02',
        identifier: 'LPL-1.02',
        shortIdentifier: 'LPL',
        osiApproved: true,
        regex: /LPL-1.02|Lucent(.)Public(.)License(.)v1.02/i
    },
    {
        name: 'Lucent Public License Version 1.0',
        identifier: 'LPL-1.0',
        shortIdentifier: 'LPL',
        osiApproved: true,
        regex: /LPL-1.0|Lucent(.)Public(.)License(.)Version(.)1.0/i
    },
    {
        name: 'MakeIndex License',
        identifier: 'MakeIndex',
        shortIdentifier: 'MakeIndex',
        osiApproved: false,
        regex: /MakeIndex|MakeIndex(.)License/i
    },
    {
        name: 'Matrix Template Library License',
        identifier: 'MTLL',
        shortIdentifier: 'MTLL',
        osiApproved: false,
        regex: /MTLL|Matrix(.)Template(.)Library(.)License/i
    },
    {
        name: 'Microsoft Public License',
        identifier: 'MS-PL',
        shortIdentifier: 'MS-PL',
        osiApproved: true,
        regex: /MS-PL|Microsoft(.)Public(.)License|MS-PL/i
    },
    {
        name: 'Microsoft Reciprocal License',
        identifier: 'MS-RL',
        shortIdentifier: 'MS-RL',
        osiApproved: true,
        regex: /MS-RL|Microsoft(.)Reciprocal(.)License|MS-RL/i
    },
    {
        name: 'MirOS Licence',
        identifier: 'MirOS',
        shortIdentifier: 'MirOS',
        osiApproved: true,
        regex: /MirOS|MirOS(.)Licence/i
    },
    {
        name: 'MIT +no-false-attribs license',
        identifier: 'MITNFA',
        shortIdentifier: 'MITNFA',
        osiApproved: false,
        regex: /MITNFA|MIT(.)+no-false-attribs(.)license/i
    },
    {
        name: 'MIT License',
        identifier: 'MIT',
        shortIdentifier: 'MIT',
        osiApproved: true,
        regex: /MIT(.)License/i
    },
    {
        name: 'Motosoto License',
        identifier: 'Motosoto',
        shortIdentifier: 'Motosoto',
        osiApproved: true,
        regex: /Motosoto|Motosoto(.)License/i
    },
    {
        name: 'Mozilla Public License 1.0',
        identifier: 'MPL-1.0',
        shortIdentifier: 'MPL',
        osiApproved: true,
        regex: /MPL-1.0|Mozilla(.)Public(.)License(.)1.0/i
    },
    {
        name: 'Mozilla Public License 1.1',
        identifier: 'MPL-1.1',
        shortIdentifier: 'MPL',
        osiApproved: true,
        regex: /MPL-1.1|Mozilla(.)Public(.)License(.)1.1/i
    },
    {
        name: 'Mozilla Public License 2.0',
        identifier: 'MPL-2.0',
        shortIdentifier: 'MPL',
        osiApproved: true,
        regex: /MPL-2.0|Mozilla(.)Public(.)License(.)2.0/i
    },
    {
        name: 'Mozilla Public License 2.0 (no copyleft exception)',
        identifier: 'MPL-2.0-no-copyleft-exception',
        shortIdentifier: 'MPL',
        osiApproved: true,
        regex: /MPL-2.0-no-copyleft-exception|Mozilla(.)Public(.)License(.)2.0(.)(no(.)copyleft(.)exception)/i
    },
    {
        name: 'mpich2 License',
        identifier: 'mpich2',
        shortIdentifier: 'mpich2',
        osiApproved: false,
        regex: /mpich2|mpich2(.)License/i
    },
    {
        name: 'Multics License',
        identifier: 'Multics',
        shortIdentifier: 'Multics',
        osiApproved: true,
        regex: /Multics|Multics(.)License/i
    },
    {
        name: 'Mup License',
        identifier: 'Mup',
        shortIdentifier: 'Mup',
        osiApproved: false,
        regex: /Mup|Mup(.)License/i
    },
    {
        name: 'NASA Open Source Agreement 1.3',
        identifier: 'NASA-1.3',
        shortIdentifier: 'NASA',
        osiApproved: true,
        regex: /NASA-1.3|NASA(.)Open(.)Source(.)Agreement(.)1.3/i
    },
    {
        name: 'Naumen Public License',
        identifier: 'Naumen',
        shortIdentifier: 'Naumen',
        osiApproved: true,
        regex: /Naumen|Naumen(.)Public(.)License/i
    },
    {
        name: 'Net Boolean Public License v1',
        identifier: 'NBPL-1.0',
        shortIdentifier: 'NBPL',
        osiApproved: false,
        regex: /NBPL-1.0|Net(.)Boolean(.)Public(.)License(.)v1/i
    },
    {
        name: 'NetCDF license',
        identifier: 'NetCDF',
        shortIdentifier: 'NetCDF',
        osiApproved: false,
        regex: /NetCDF|NetCDF(.)license/i
    },
    {
        name: 'Nethack General Public License',
        identifier: 'NGPL',
        shortIdentifier: 'NGPL',
        osiApproved: true,
        regex: /NGPL|Nethack(.)General(.)Public(.)License/i
    },
    {
        name: 'Netizen Open Source License',
        identifier: 'NOSL',
        shortIdentifier: 'NOSL',
        osiApproved: false,
        regex: /NOSL|Netizen(.)Open(.)Source(.)License/i
    },
    {
        name: 'Netscape Public License v1.0',
        identifier: 'NPL-1.0',
        shortIdentifier: 'NPL',
        osiApproved: false,
        regex: /NPL-1.0|Netscape(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Netscape Public License v1.1',
        identifier: 'NPL-1.1',
        shortIdentifier: 'NPL',
        osiApproved: false,
        regex: /NPL-1.1|Netscape(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'Newsletr License',
        identifier: 'Newsletr',
        shortIdentifier: 'Newsletr',
        osiApproved: false,
        regex: /Newsletr|Newsletr(.)License/i
    },
    {
        name: 'No Limit Public License',
        identifier: 'NLPL',
        shortIdentifier: 'NLPL',
        osiApproved: false,
        regex: /NLPL|No(.)Limit(.)Public(.)License/i
    },
    {
        name: 'Nokia Open Source License',
        identifier: 'Nokia',
        shortIdentifier: 'Nokia',
        osiApproved: true,
        regex: /Nokia|Nokia(.)Open(.)Source(.)License/i
    },
    {
        name: 'Non-Profit Open Software License 3.0',
        identifier: 'NPOSL-3.0',
        shortIdentifier: 'NPOSL',
        osiApproved: true,
        regex: /NPOSL-3.0|Non-Profit(.)Open(.)Software(.)License(.)3.0/i
    },
    {
        name: 'Noweb License',
        identifier: 'Noweb',
        shortIdentifier: 'Noweb',
        osiApproved: false,
        regex: /Noweb|Noweb(.)License/i
    },
    {
        name: 'NRL License',
        identifier: 'NRL',
        shortIdentifier: 'NRL',
        osiApproved: false,
        regex: /NRL|NRL(.)License/i
    },
    {
        name: 'NTP License',
        identifier: 'NTP',
        shortIdentifier: 'NTP',
        osiApproved: true,
        regex: /NTP|NTP(.)License/i
    },
    {
        name: 'Nunit License',
        identifier: 'Nunit',
        shortIdentifier: 'Nunit',
        osiApproved: false,
        regex: /Nunit|Nunit(.)License/i
    },
    {
        name: 'OCLC Research Public License 2.0',
        identifier: 'OCLC-2.0',
        shortIdentifier: 'OCLC',
        osiApproved: true,
        regex: /OCLC-2.0|OCLC(.)Research(.)Public(.)License(.)2.0/i
    },
    {
        name: 'ODC Open Database License v1.0',
        identifier: 'ODbL-1.0',
        shortIdentifier: 'ODbL',
        osiApproved: false,
        regex: /ODbL-1.0|ODC(.)Open(.)Database(.)License(.)v1.0/i
    },
    {
        name: 'ODC Public Domain Dedication & License 1.0',
        identifier: 'PDDL-1.0',
        shortIdentifier: 'PDDL',
        osiApproved: false,
        regex: /PDDL-1.0|ODC(.)Public(.)Domain(.)Dedication(.)&(.)License(.)1.0/i
    },
    {
        name: 'Open CASCADE Technology Public License',
        identifier: 'OCCT-PL',
        shortIdentifier: 'OCCT-PL',
        osiApproved: false,
        regex: /OCCT-PL|Open(.)CASCADE(.)Technology(.)Public(.)License|OCCT-PL/i
    },
    {
        name: 'Open Group Test Suite License',
        identifier: 'OGTSL',
        shortIdentifier: 'OGTSL',
        osiApproved: true,
        regex: /OGTSL|Open(.)Group(.)Test(.)Suite(.)License/i
    },
    {
        name: 'Open LDAP Public License 2.2.2',
        identifier: 'OLDAP-2.2.2',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.2.2|Open(.)LDAP(.)Public(.)License(.)2.2.2/i
    },
    {
        name: 'Open LDAP Public License v1.1',
        identifier: 'OLDAP-1.1',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-1.1|Open(.)LDAP(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'Open LDAP Public License v1.2',
        identifier: 'OLDAP-1.2',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-1.2|Open(.)LDAP(.)Public(.)License(.)v1.2/i
    },
    {
        name: 'Open LDAP Public License v1.3',
        identifier: 'OLDAP-1.3',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-1.3|Open(.)LDAP(.)Public(.)License(.)v1.3/i
    },
    {
        name: 'Open LDAP Public License v1.4',
        identifier: 'OLDAP-1.4',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-1.4|Open(.)LDAP(.)Public(.)License(.)v1.4/i
    },
    {
        name: 'Open LDAP Public License v2.0 (or possibly 2.0A and 2.0B)',
        identifier: 'OLDAP-2.0',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.0|Open(.)LDAP(.)Public(.)License(.)v2.0(.)(or(.)possibly(.)2.0A(.)and(.)2.0B)/i
    },
    {
        name: 'Open LDAP Public License v2.0.1',
        identifier: 'OLDAP-2.0.1',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.0.1|Open(.)LDAP(.)Public(.)License(.)v2.0.1/i
    },
    {
        name: 'Open LDAP Public License v2.1',
        identifier: 'OLDAP-2.1',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.1|Open(.)LDAP(.)Public(.)License(.)v2.1/i
    },
    {
        name: 'Open LDAP Public License v2.2',
        identifier: 'OLDAP-2.2',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.2|Open(.)LDAP(.)Public(.)License(.)v2.2/i
    },
    {
        name: 'Open LDAP Public License v2.2.1',
        identifier: 'OLDAP-2.2.1',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.2.1|Open(.)LDAP(.)Public(.)License(.)v2.2.1/i
    },
    {
        name: 'Open LDAP Public License v2.3',
        identifier: 'OLDAP-2.3',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.3|Open(.)LDAP(.)Public(.)License(.)v2.3/i
    },
    {
        name: 'Open LDAP Public License v2.4',
        identifier: 'OLDAP-2.4',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.4|Open(.)LDAP(.)Public(.)License(.)v2.4/i
    },
    {
        name: 'Open LDAP Public License v2.5',
        identifier: 'OLDAP-2.5',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.5|Open(.)LDAP(.)Public(.)License(.)v2.5/i
    },
    {
        name: 'Open LDAP Public License v2.6',
        identifier: 'OLDAP-2.6',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.6|Open(.)LDAP(.)Public(.)License(.)v2.6/i
    },
    {
        name: 'Open LDAP Public License v2.7',
        identifier: 'OLDAP-2.7',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.7|Open(.)LDAP(.)Public(.)License(.)v2.7/i
    },
    {
        name: 'Open LDAP Public License v2.8',
        identifier: 'OLDAP-2.8',
        shortIdentifier: 'OLDAP',
        osiApproved: false,
        regex: /OLDAP-2.8|Open(.)LDAP(.)Public(.)License(.)v2.8/i
    },
    {
        name: 'Open Market License',
        identifier: 'OML',
        shortIdentifier: 'OML',
        osiApproved: false,
        regex: /OML|Open(.)Market(.)License/i
    },
    {
        name: 'Open Public License v1.0',
        identifier: 'OPL-1.0',
        shortIdentifier: 'OPL',
        osiApproved: false,
        regex: /OPL-1.0|Open(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Open Software License 1.0',
        identifier: 'OSL-1.0',
        shortIdentifier: 'OSL',
        osiApproved: true,
        regex: /OSL-1.0|Open(.)Software(.)License(.)1.0/i
    },
    {
        name: 'Open Software License 1.1',
        identifier: 'OSL-1.1',
        shortIdentifier: 'OSL',
        osiApproved: false,
        regex: /OSL-1.1|Open(.)Software(.)License(.)1.1/i
    },
    {
        name: 'Open Software License 2.0',
        identifier: 'OSL-2.0',
        shortIdentifier: 'OSL',
        osiApproved: true,
        regex: /OSL-2.0|Open(.)Software(.)License(.)2.0/i
    },
    {
        name: 'Open Software License 2.1',
        identifier: 'OSL-2.1',
        shortIdentifier: 'OSL',
        osiApproved: true,
        regex: /OSL-2.1|Open(.)Software(.)License(.)2.1/i
    },
    {
        name: 'Open Software License 3.0',
        identifier: 'OSL-3.0',
        shortIdentifier: 'OSL',
        osiApproved: true,
        regex: /OSL-3.0|Open(.)Software(.)License(.)3.0/i
    },
    {
        name: 'OpenSSL License',
        identifier: 'OpenSSL',
        shortIdentifier: 'OpenSSL',
        osiApproved: false,
        regex: /OpenSSL|OpenSSL(.)License/i
    },
    {
        name: 'PHP License v3.0',
        identifier: 'PHP-3.0',
        shortIdentifier: 'PHP',
        osiApproved: true,
        regex: /PHP-3.0|PHP(.)License(.)v3.0/i
    },
    {
        name: 'PHP License v3.01',
        identifier: 'PHP-3.01',
        shortIdentifier: 'PHP',
        osiApproved: false,
        regex: /PHP-3.01|PHP(.)License(.)v3.01/i
    },
    {
        name: 'Plexus Classworlds License',
        identifier: 'Plexus',
        shortIdentifier: 'Plexus',
        osiApproved: false,
        regex: /Plexus|Plexus(.)Classworlds(.)License/i
    },
    {
        name: 'PostgreSQL License',
        identifier: 'PostgreSQL',
        shortIdentifier: 'PostgreSQL',
        osiApproved: true,
        regex: /PostgreSQL|PostgreSQL(.)License/i
    },
    {
        name: 'psfrag License',
        identifier: 'psfrag',
        shortIdentifier: 'psfrag',
        osiApproved: false,
        regex: /psfrag|psfrag(.)License/i
    },
    {
        name: 'psutils License',
        identifier: 'psutils',
        shortIdentifier: 'psutils',
        osiApproved: false,
        regex: /psutils|psutils(.)License/i
    },
    {
        name: 'Python License 2.0',
        identifier: 'Python-2.0',
        shortIdentifier: 'Python',
        osiApproved: true,
        regex: /Python-2.0|Python(.)License(.)2.0/i
    },
    {
        name: 'Q Public License 1.0',
        identifier: 'QPL-1.0',
        shortIdentifier: 'QPL',
        osiApproved: true,
        regex: /QPL-1.0|Q(.)Public(.)License(.)1.0/i
    },
    {
        name: 'Qhull License',
        identifier: 'Qhull',
        shortIdentifier: 'Qhull',
        osiApproved: false,
        regex: /Qhull|Qhull(.)License/i
    },
    {
        name: 'Rdisc License',
        identifier: 'Rdisc',
        shortIdentifier: 'Rdisc',
        osiApproved: false,
        regex: /Rdisc|Rdisc(.)License/i
    },
    {
        name: 'RealNetworks Public Source License v1.0',
        identifier: 'RPSL-1.0',
        shortIdentifier: 'RPSL',
        osiApproved: true,
        regex: /RPSL-1.0|RealNetworks(.)Public(.)Source(.)License(.)v1.0/i
    },
    {
        name: 'Reciprocal Public License 1.1',
        identifier: 'RPL-1.1',
        shortIdentifier: 'RPL',
        osiApproved: true,
        regex: /RPL-1.1|Reciprocal(.)Public(.)License(.)1.1/i
    },
    {
        name: 'Reciprocal Public License 1.5',
        identifier: 'RPL-1.5',
        shortIdentifier: 'RPL',
        osiApproved: true,
        regex: /RPL-1.5|Reciprocal(.)Public(.)License(.)1.5/i
    },
    {
        name: 'Red Hat eCos Public License v1.1',
        identifier: 'RHeCos-1.1',
        shortIdentifier: 'RHeCos',
        osiApproved: false,
        regex: /RHeCos-1.1|Red(.)Hat(.)eCos(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'Ricoh Source Code Public License',
        identifier: 'RSCPL',
        shortIdentifier: 'RSCPL',
        osiApproved: true,
        regex: /RSCPL|Ricoh(.)Source(.)Code(.)Public(.)License/i
    },
    {
        name: 'RSA Message-Digest License',
        identifier: 'RSA-MD',
        shortIdentifier: 'RSA-MD',
        osiApproved: false,
        regex: /RSA-MD|RSA(.)Message-Digest(.)License|RSA-MD/i
    },
    {
        name: 'Ruby License',
        identifier: 'Ruby',
        shortIdentifier: 'Ruby',
        osiApproved: false,
        regex: /Ruby|Ruby(.)License/i
    },
    {
        name: 'Sax Public Domain Notice',
        identifier: 'SAX-PD',
        shortIdentifier: 'SAX-PD',
        osiApproved: false,
        regex: /SAX-PD|Sax(.)Public(.)Domain(.)Notice|SAX-PD/i
    },
    {
        name: 'Saxpath License',
        identifier: 'Saxpath',
        shortIdentifier: 'Saxpath',
        osiApproved: false,
        regex: /Saxpath|Saxpath(.)License/i
    },
    {
        name: 'SCEA Shared Source License',
        identifier: 'SCEA',
        shortIdentifier: 'SCEA',
        osiApproved: false,
        regex: /SCEA|SCEA(.)Shared(.)Source(.)License/i
    },
    {
        name: 'Scheme Widget Library (SWL) Software License Agreement',
        identifier: 'SWL',
        shortIdentifier: 'SWL',
        osiApproved: false,
        regex: /SWL|Scheme(.)Widget(.)Library(.)(SWL)(.)Software(.)License(.)Agreement/i
    },
    {
        name: 'Sendmail License',
        identifier: 'Sendmail',
        shortIdentifier: 'Sendmail',
        osiApproved: false,
        regex: /Sendmail|Sendmail(.)License/i
    },
    {
        name: 'SGI Free Software License B v1.0',
        identifier: 'SGI-B-1.0',
        shortIdentifier: 'SGI-B',
        osiApproved: false,
        regex: /SGI-B-1.0|SGI(.)Free(.)Software(.)License(.)B(.)v1.0|SGI-B/i
    },
    {
        name: 'SGI Free Software License B v1.1',
        identifier: 'SGI-B-1.1',
        shortIdentifier: 'SGI-B',
        osiApproved: false,
        regex: /SGI-B-1.1|SGI(.)Free(.)Software(.)License(.)B(.)v1.1|SGI-B/i
    },
    {
        name: 'SGI Free Software License B v2.0',
        identifier: 'SGI-B-2.0',
        shortIdentifier: 'SGI-B',
        osiApproved: false,
        regex: /SGI-B-2.0|SGI(.)Free(.)Software(.)License(.)B(.)v2.0|SGI-B/i
    },
    {
        name: 'SIL Open Font License 1.0',
        identifier: 'OFL-1.0',
        shortIdentifier: 'OFL',
        osiApproved: false,
        regex: /OFL-1.0|SIL(.)Open(.)Font(.)License(.)1.0/i
    },
    {
        name: 'SIL Open Font License 1.1',
        identifier: 'OFL-1.1',
        shortIdentifier: 'OFL',
        osiApproved: true,
        regex: /OFL-1.1|SIL(.)Open(.)Font(.)License(.)1.1/i
    },
    {
        name: 'Simple Public License 2.0',
        identifier: 'SimPL-2.0',
        shortIdentifier: 'SimPL',
        osiApproved: true,
        regex: /SimPL-2.0|Simple(.)Public(.)License(.)2.0/i
    },
    {
        name: 'Sleepycat License',
        identifier: 'Sleepycat',
        shortIdentifier: 'Sleepycat',
        osiApproved: true,
        regex: /Sleepycat|Sleepycat(.)License/i
    },
    {
        name: 'SNIA Public License 1.1',
        identifier: 'SNIA',
        shortIdentifier: 'SNIA',
        osiApproved: false,
        regex: /SNIA|SNIA(.)Public(.)License(.)1.1/i
    },
    {
        name: 'Spencer License 86',
        identifier: 'Spencer-86',
        shortIdentifier: 'Spencer',
        osiApproved: false,
        regex: /Spencer-86|Spencer(.)License(.)86/i
    },
    {
        name: 'Spencer License 94',
        identifier: 'Spencer-94',
        shortIdentifier: 'Spencer',
        osiApproved: false,
        regex: /Spencer-94|Spencer(.)License(.)94/i
    },
    {
        name: 'Spencer License 99',
        identifier: 'Spencer-99',
        shortIdentifier: 'Spencer',
        osiApproved: false,
        regex: /Spencer-99|Spencer(.)License(.)99/i
    },
    {
        name: 'Standard ML of New Jersey License',
        identifier: 'SMLNJ',
        shortIdentifier: 'SMLNJ',
        osiApproved: false,
        regex: /SMLNJ|Standard(.)ML(.)of(.)New(.)Jersey(.)License/i
    },
    {
        name: 'SugarCRM Public License v1.1.3',
        identifier: 'SugarCRM-1.1.3',
        shortIdentifier: 'SugarCRM',
        osiApproved: false,
        regex: /SugarCRM-1.1.3|SugarCRM(.)Public(.)License(.)v1.1.3/i
    },
    {
        name: 'Sun Industry Standards Source License v1.1',
        identifier: 'SISSL',
        shortIdentifier: 'SISSL',
        osiApproved: true,
        regex: /SISSL|Sun(.)Industry(.)Standards(.)Source(.)License(.)v1.1/i
    },
    {
        name: 'Sun Industry Standards Source License v1.2',
        identifier: 'SISSL-1.2',
        shortIdentifier: 'SISSL',
        osiApproved: false,
        regex: /SISSL-1.2|Sun(.)Industry(.)Standards(.)Source(.)License(.)v1.2/i
    },
    {
        name: 'Sun Public License v1.0',
        identifier: 'SPL-1.0',
        shortIdentifier: 'SPL',
        osiApproved: true,
        regex: /SPL-1.0|Sun(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Sybase Open Watcom Public License 1.0',
        identifier: 'Watcom-1.0',
        shortIdentifier: 'Watcom',
        osiApproved: true,
        regex: /Watcom-1.0|Sybase(.)Open(.)Watcom(.)Public(.)License(.)1.0/i
    },
    {
        name: 'TCL/TK License',
        identifier: 'TCL',
        shortIdentifier: 'TCL',
        osiApproved: false,
        regex: /TCL|TCL\/TK(.)License/i
    },
    {
        name: 'The Unlicense',
        identifier: 'Unlicense',
        shortIdentifier: 'Unlicense',
        osiApproved: false,
        regex: /Unlicense|The(.)Unlicense/i
    },
    {
        name: 'TMate Open Source License',
        identifier: 'TMate',
        shortIdentifier: 'TMate',
        osiApproved: false,
        regex: /TMate|TMate(.)Open(.)Source(.)License/i
    },
    {
        name: 'TORQUE v2.5+ Software License v1.1',
        identifier: 'TORQUE-1.1',
        shortIdentifier: 'TORQUE',
        osiApproved: false,
        regex: /TORQUE-1.1|TORQUE(.)v2.5+(.)Software(.)License(.)v1.1/i
    },
    {
        name: 'Trusster Open Source License',
        identifier: 'TOSL',
        shortIdentifier: 'TOSL',
        osiApproved: false,
        regex: /TOSL|Trusster(.)Open(.)Source(.)License/i
    },
    {
        name: 'Unicode Terms of Use',
        identifier: 'Unicode-TOU',
        shortIdentifier: 'Unicode-TOU',
        osiApproved: false,
        regex: /Unicode-TOU|Unicode(.)Terms(.)of(.)Use|Unicode-TOU/i
    },
    {
        name: 'Universal Permissive License v1.0',
        identifier: 'UPL-1.0',
        shortIdentifier: 'UPL',
        osiApproved: true,
        regex: /UPL-1.0|Universal(.)Permissive(.)License(.)v1.0/i
    },
    {
        name: 'University of Illinois/NCSA Open Source License',
        identifier: 'NCSA',
        shortIdentifier: 'NCSA',
        osiApproved: true,
        regex: /NCSA|University(.)of(.)Illinois\/NCSA(.)Open(.)Source(.)License/i
    },
    {
        name: 'Vim License',
        identifier: 'Vim',
        shortIdentifier: 'Vim',
        osiApproved: false,
        regex: /Vim|Vim(.)License/i
    },
    {
        name: 'VOSTROM Public License for Open Source',
        identifier: 'VOSTROM',
        shortIdentifier: 'VOSTROM',
        osiApproved: false,
        regex: /VOSTROM|VOSTROM(.)Public(.)License(.)for(.)Open(.)Source/i
    },
    {
        name: 'Vovida Software License v1.0',
        identifier: 'VSL-1.0',
        shortIdentifier: 'VSL',
        osiApproved: true,
        regex: /VSL-1.0|Vovida(.)Software(.)License(.)v1.0/i
    },
    {
        name: 'W3C Software Notice and License (1998-07-20)',
        identifier: 'W3C-19980720',
        shortIdentifier: 'W3C-19980720',
        osiApproved: false,
        regex: /W3C-19980720|W3C(.)Software(.)Notice(.)and(.)License(.)(1998-07-20)|W3C-19980720/i
    },
    {
        name: 'W3C Software Notice and License (2002-12-31)',
        identifier: 'W3C',
        shortIdentifier: 'W3C',
        osiApproved: true,
        regex: /W3C|W3C(.)Software(.)Notice(.)and(.)License(.)(2002-12-31)/i
    },
    {
        name: 'Wsuipa License',
        identifier: 'Wsuipa',
        shortIdentifier: 'Wsuipa',
        osiApproved: false,
        regex: /Wsuipa|Wsuipa(.)License/i
    },
    {
        name: 'X.Net License',
        identifier: 'Xnet',
        shortIdentifier: 'Xnet',
        osiApproved: true,
        regex: /Xnet|X.Net(.)License/i
    },
    {
        name: 'X11 License',
        identifier: 'X11',
        shortIdentifier: 'X11',
        osiApproved: false,
        regex: /X11|X11(.)License/i
    },
    {
        name: 'Xerox License',
        identifier: 'Xerox',
        shortIdentifier: 'Xerox',
        osiApproved: false,
        regex: /Xerox|Xerox(.)License/i
    },
    {
        name: 'XFree86 License 1.1',
        identifier: 'XFree86-1.1',
        shortIdentifier: 'XFree86',
        osiApproved: false,
        regex: /XFree86-1.1|XFree86(.)License(.)1.1/i
    },
    {
        name: 'xinetd License',
        identifier: 'xinetd',
        shortIdentifier: 'xinetd',
        osiApproved: false,
        regex: /xinetd|xinetd(.)License/i
    },
    {
        name: 'XPP License',
        identifier: 'xpp',
        shortIdentifier: 'xpp',
        osiApproved: false,
        regex: /xpp|XPP(.)License/i
    },
    {
        name: 'XSkat License',
        identifier: 'XSkat',
        shortIdentifier: 'XSkat',
        osiApproved: false,
        regex: /XSkat|XSkat(.)License/i
    },
    {
        name: 'Yahoo! Public License v1.0',
        identifier: 'YPL-1.0',
        shortIdentifier: 'YPL',
        osiApproved: false,
        regex: /YPL-1.0|Yahoo!(.)Public(.)License(.)v1.0/i
    },
    {
        name: 'Yahoo! Public License v1.1',
        identifier: 'YPL-1.1',
        shortIdentifier: 'YPL',
        osiApproved: false,
        regex: /YPL-1.1|Yahoo!(.)Public(.)License(.)v1.1/i
    },
    {
        name: 'Zed License',
        identifier: 'Zed',
        shortIdentifier: 'Zed',
        osiApproved: false,
        regex: /Zed(.)License/i
    },
    {
        name: 'Zend License v2.0',
        identifier: 'Zend-2.0',
        shortIdentifier: 'Zend',
        osiApproved: false,
        regex: /Zend-2.0|Zend(.)License(.)v2.0/i
    },
    {
        name: 'Zimbra Public License v1.3',
        identifier: 'Zimbra-1.3',
        shortIdentifier: 'Zimbra',
        osiApproved: false,
        regex: /Zimbra-1.3|Zimbra(.)Public(.)License(.)v1.3/i
    },
    {
        name: 'Zimbra Public License v1.4',
        identifier: 'Zimbra-1.4',
        shortIdentifier: 'Zimbra',
        osiApproved: false,
        regex: /Zimbra-1.4|Zimbra(.)Public(.)License(.)v1.4/i
    },
    {
        name: 'zlib License',
        identifier: 'Zlib',
        shortIdentifier: 'Zlib',
        osiApproved: true,
        regex: /Zlib|zlib(.)License/i
    },
    {
        name: 'zlib/libpng License with Acknowledgement',
        identifier: 'zlib-acknowledgement',
        shortIdentifier: 'Zlib',
        osiApproved: false,
        regex: /zlib-acknowledgement|zlib\/libpng(.)License(.)with(.)Acknowledgement/i
    },
    {
        name: 'Zope Public License 1.1',
        identifier: 'ZPL-1.1',
        shortIdentifier: 'ZPL',
        osiApproved: false,
        regex: /ZPL-1.1|Zope(.)Public(.)License(.)1.1/i
    },
    {
        name: 'Zope Public License 2.0',
        identifier: 'ZPL-2.0',
        shortIdentifier: 'ZPL',
        osiApproved: true,
        regex: /ZPL-2.0|Zope(.)Public(.)License(.)2.0/i
    },
    {
        name: 'Zope Public License 2.1',
        identifier: 'ZPL-2.1',
        shortIdentifier: 'ZPL',
        osiApproved: false,
        regex: /ZPL-2.1|Zope(.)Public(.)License(.)2.1/i
    }
];
