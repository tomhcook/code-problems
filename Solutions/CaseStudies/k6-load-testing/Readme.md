# Rolling Out k6 Load Testing and Finding What It Caught

Owned the adoption of **k6** performance and load testing, from choosing the tool through rolling it out to the team. It exposed major weak points across the majority of the applications tested that the previous testing approach had missed. The fixes that followed improved response times by 18.3%.

## At a glance
* **Problem**: The existing testing approach was missing performance and reliability problems under load.
* **Approach**: Selected k6, then rolled it out to the team and ran it against the applications.
* **Example finding**: An API that ran slowly and failed after more than a minute under load.
* **Outcome**: Weak points found across most applications; an 18.3% improvement in response times after the fixes.

## Technical Showcase
* **Role**: Owner of the k6 adoption (tool selection through team rollout)
* **Tooling**: k6 load testing
* **CI/CD**: Azure DevOps pipelines

---

## 1. The Challenge
The previous testing approach did not show how applications behaved under load. The aim was to find real performance and reliability problems before users did, and to give the team a repeatable way to check for them.

---

## 2. What k6 Found
* **A slow, failing API**: One API was running slowly and requests were failing after more than a minute. k6 showed that it was not retrying requests properly and was leaving connections open. Under load this caused large numbers of requests to fail.
* **Wider weak points**: Similar problems showed up across the majority of the applications tested, which the previous approach had not caught.

---

## 3. Results
* **18.3% faster responses**: Changes made after the k6 findings improved response times by 18.3% across the applications.
* **Team adoption**: k6 was rolled out to the team, so load testing became a repeatable check rather than a one-off.
