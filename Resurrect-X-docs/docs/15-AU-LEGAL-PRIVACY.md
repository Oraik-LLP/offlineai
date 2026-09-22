# 15 — Australian Legal / Privacy Considerations

> Product/security planning material only. Not legal advice. Obtain current advice for each firm's jurisdiction, practice area, contracts and deployment.

## 1. Privacy Act / Australian Privacy Principles

The Australian Privacy Principles (APPs) govern handling of personal information for entities covered by the Privacy Act 1988. Relevant product themes include:

- collection minimisation and lawful/fair collection;
- use/disclosure limits;
- cross-border disclosure considerations;
- data quality;
- access/correction;
- security of personal information;
- deletion/de-identification when no longer needed, subject to legal/recordkeeping exceptions.

APP 11 requires reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification or disclosure. Current OAIC guidance states that reasonable steps include technical and organisational measures.

Product implications:

- define data flows;
- minimise connected/cloud processing;
- strong ACLs;
- encryption;
- audit;
- retention/deletion controls;
- incident response;
- careful handling of backups and derived indexes.

## 2. Notifiable Data Breaches (NDB)

For covered entities, an eligible data breach can trigger notification duties when unauthorised access/disclosure/loss is likely to result in serious harm and remedial action has not prevented that likely risk.

Product implications:

- preserve incident/audit evidence;
- provide rapid isolation/credential rotation;
- support identification of affected data/matters;
- maintain an incident playbook;
- customer must have a process to assess suspected breaches and obtain legal/privacy advice.

Do not hard-code legal notification decisions into the product as if the software can determine them automatically.

## 3. Legal-profession AI guidance

Australian legal regulators and professional bodies have emphasised that existing duties still apply when AI is used. Current NSW guidance addresses areas including:

- confidentiality;
- competence/accuracy;
- duty to the court;
- supervision;
- privacy/data security;
- procurement and responsible use.

The joint guidance from NSW, Victoria and Western Australia warns against placing confidential/sensitive/privileged client material into public AI tools without appropriate safeguards/contractual understanding.

Product implications:

- local production is the default target;
- cloud demo excludes client data;
- citations and review are first-class;
- firm policy can limit use cases by risk;
- audit supports supervision but does not replace professional responsibility.

## 4. Privilege/confidentiality

Do not market Resurrect X as “guaranteeing privilege”.

Architecture can reduce the distinct risk created by transmitting client material to third-party AI infrastructure, but privilege/confidentiality also depends on legal facts, access control, user behaviour, and matter circumstances.

Safer marketing wording:

> “Designed so approved production workflows can operate within firm-controlled infrastructure, reducing the need to transmit client material to external AI providers.”

## 5. Jurisdiction

Australia is not a single operational rulebook for legal practice. Uniform Law/guidance applies differently across jurisdictions, and courts can issue their own practice notes regarding AI use.

Deployment checklist must therefore capture:

- state/territory;
- court/tribunal workflows;
- client contractual restrictions;
- insurer requirements;
- government/security classification obligations where relevant;
- records retention rules;
- privacy coverage and cross-border policies.

## 6. Data residency vs processing location

Do not confuse:

- storage in Australia;
- processing in Australia;
- processing by a third party;
- model-training policy;
- retention policy;
- actual local/on-premise processing.

The architecture document should show each external exception explicitly.

## 7. Recommended customer documentation

Before production:

- data-flow diagram;
- processing-boundary statement;
- security controls summary;
- model/provider register;
- approved-use policy;
- prohibited-use policy;
- retention schedule;
- incident response plan;
- backup/restore plan;
- change/update policy;
- staff AI-use training;
- deployment acceptance record.

## 8. Primary references to re-check

- Privacy Act 1988 — https://www.legislation.gov.au/C2004A03712/latest/details
- OAIC APP guidance — https://www.oaic.gov.au/privacy/australian-privacy-principles/
- OAIC NDB guidance — https://www.oaic.gov.au/privacy/notifiable-data-breaches/
- Law Society of NSW ethics/AI resources — https://www.lawsociety.com.au/
- Law Council of Australia AI portal — https://lawcouncil.au/policy-agenda/advancing-the-profession/artificial-intelligence-and-the-legal-profession
- ASD/ACSC — https://www.cyber.gov.au/
