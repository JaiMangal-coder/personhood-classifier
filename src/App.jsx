import { useState } from "react";

export default function App() {
  const defaultResponses = {
    // Universal questionnaire
    self_reflection: null,
    continuity_across_time: null,
    memory_link: null,

    meaningful_I: null,
    reciprocal_dialogue: null,
    discourse_presence: null,

    state_recognition: null,
    rights_in_practice: null,
    political_belonging: null,

    protected_not_thing: null,
    legal_capacities: null,
    legal_presence: null,

    // Expression gate
    can_express: null,
    expression_understood: null,
    expression_recognized: null,
  };

  const SCALE_OPTIONS = [
    { label: "No", value: 0 },
    { label: "Limited", value: 1 },
    { label: "Substantial", value: 2 },
    { label: "Full", value: 3 },
  ];

  const GATE_OPTIONS = [
    { label: "No", value: 0 },
    { label: "Partial", value: 1 },
    { label: "Yes", value: 2 },
  ];

  const PRESETS = {
    citizen: {
      label: "Citizen Adult Human",
      responses: {
        self_reflection: 3,
        continuity_across_time: 3,
        memory_link: 3,

        meaningful_I: 3,
        reciprocal_dialogue: 3,
        discourse_presence: 3,

        state_recognition: 3,
        rights_in_practice: 3,
        political_belonging: 3,

        protected_not_thing: 3,
        legal_capacities: 3,
        legal_presence: 3,

        can_express: 2,
        expression_understood: 2,
        expression_recognized: 2,
      },
    },

    refugee: {
      label: "Stateless Refugee",
      responses: {
        self_reflection: 3,
        continuity_across_time: 3,
        memory_link: 3,

        meaningful_I: 3,
        reciprocal_dialogue: 3,
        discourse_presence: 3,

        state_recognition: 0,
        rights_in_practice: 1,
        political_belonging: 0,

        protected_not_thing: 1,
        legal_capacities: 1,
        legal_presence: 1,

        can_express: 2,
        expression_understood: 2,
        expression_recognized: 0,
      },
    },

    corporation: {
      label: "Corporation",
      responses: {
        self_reflection: 0,
        continuity_across_time: 1,
        memory_link: 0,

        meaningful_I: 1,
        reciprocal_dialogue: 1,
        discourse_presence: 2,

        state_recognition: 3,
        rights_in_practice: 3,
        political_belonging: 2,

        protected_not_thing: 3,
        legal_capacities: 3,
        legal_presence: 3,

        can_express: 2,
        expression_understood: 2,
        expression_recognized: 2,
      },
    },

    chatbot: {
      label: "LLM Bot (Chatbot)",
      responses: {
        self_reflection: 0,
        continuity_across_time: 0,
        memory_link: 0,

        meaningful_I: 2,
        reciprocal_dialogue: 1,
        discourse_presence: 1,

        state_recognition: 0,
        rights_in_practice: 0,
        political_belonging: 0,

        protected_not_thing: 0,
        legal_capacities: 0,
        legal_presence: 0,

        can_express: 2,
        expression_understood: 1,
        expression_recognized: 1,
      },
    },

    chimp: {
      label: "Chimpanzee (high cognition)",
      responses: {
        self_reflection: 2,
        continuity_across_time: 2,
        memory_link: 2,

        meaningful_I: 0,
        reciprocal_dialogue: 1,
        discourse_presence: 1,

        state_recognition: 0,
        rights_in_practice: 0,
        political_belonging: 0,

        protected_not_thing: 1,
        legal_capacities: 0,
        legal_presence: 0,

        can_express: 1,
        expression_understood: 1,
        expression_recognized: 0,
      },
    },

    fetus: {
      label: "Fetus (late-term)",
      responses: {
        self_reflection: 0,
        continuity_across_time: 0,
        memory_link: 0,

        meaningful_I: 0,
        reciprocal_dialogue: 0,
        discourse_presence: 0,

        state_recognition: 0,
        rights_in_practice: 0,
        political_belonging: 0,

        protected_not_thing: 1,
        legal_capacities: 0,
        legal_presence: 1,

        can_express: 0,
        expression_understood: 0,
        expression_recognized: 1,
      },
    },
  };

  const [mode, setMode] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [responses, setResponses] = useState(defaultResponses);
  const [documentationOpen, setDocumentationOpen] = useState(false);

  function updateResponse(key, value) {
    setResponses((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetAll() {
    setResponses(defaultResponses);
    setSelectedPreset(null);
  }

  function loadPreset(key) {
    setSelectedPreset(key);
    setResponses({
      ...defaultResponses,
      ...PRESETS[key].responses,
    });
  }

  function allUniversalAnswered(r) {
    const universalKeys = [
      "self_reflection",
      "continuity_across_time",
      "memory_link",
      "meaningful_I",
      "reciprocal_dialogue",
      "discourse_presence",
      "state_recognition",
      "rights_in_practice",
      "political_belonging",
      "protected_not_thing",
      "legal_capacities",
      "legal_presence",
    ];
    return universalKeys.every((key) => r[key] !== null);
  }

  function allGateAnswered(r) {
    const gateKeys = [
      "can_express",
      "expression_understood",
      "expression_recognized",
    ];
    return gateKeys.every((key) => r[key] !== null);
  }

  function classifyLocke(r) {
    const score =
      r.self_reflection + r.continuity_across_time + r.memory_link;

    if (score >= 8) {
      return {
        label: "Psychological Person",
        reasons: [
          "Strong reflective self-awareness is present.",
          "A stable sense of self across time is present.",
          "Present consciousness is connected to past experience.",
        ],
      };
    }

    if (score >= 4) {
      return {
        label: "Limited or Borderline Psychological Self",
        reasons: [
          "Some reflective continuity is present, but not at the highest level.",
          "Psychological personhood appears partial or unstable under this framework.",
        ],
      };
    }

    return {
      label: "Non-person",
      reasons: [
        "Reflection, continuity, and memory-linked consciousness are too weak to support personhood in Locke’s sense.",
      ],
    };
  }

  function classifyBenveniste(r) {
    const score =
      r.meaningful_I + r.reciprocal_dialogue + r.discourse_presence;

    if (score >= 8) {
      return {
        label: "Linguistic Person",
        reasons: [
          'The being can meaningfully take up the position of "I."',
          "It can enter reciprocal address rather than merely emit output.",
          "Its communication functions as discourse in a present exchange.",
        ],
      };
    }

    if (score >= 4) {
      return {
        label: "Simulated Subject",
        reasons: [
          "Some markers of subjectivity in language are present.",
          "However, linguistic personhood remains partial, reactive, or unstable.",
        ],
      };
    }

    return {
      label: "Non-subject",
      reasons: [
        'The being cannot fully occupy the position of "I" in reciprocal discourse.',
      ],
    };
  }

  function classifyArendt(r) {
    const score =
      r.state_recognition + r.rights_in_practice + r.political_belonging;

    if (score >= 8) {
      return {
        label: "Political Person",
        reasons: [
          "The being is recognized and protected by a political order.",
          "Rights are claimable in practice.",
          "It has a secure place within a political community.",
        ],
      };
    }

    if (score >= 4) {
      return {
        label: "Precarious Subject",
        reasons: [
          "Some degree of political recognition or rights exists.",
          "But belonging and enforceable protection remain unstable or incomplete.",
        ],
      };
    }

    return {
      label: "Rightless",
      reasons: [
        "The being lacks secure political recognition, enforceable rights, and stable belonging.",
      ],
    };
  }

  function classifyKurki(r) {
    const score =
      r.protected_not_thing + r.legal_capacities + r.legal_presence;

    if (score >= 8) {
      return {
        label: "Full Legal Person",
        reasons: [
          "The being is protected by law as more than a mere object.",
          "It possesses major legal capacities.",
          "It can appear in law as a recognized legal subject.",
        ],
      };
    }

    if (score >= 5) {
      return {
        label: "Partial Legal Person",
        reasons: [
          "The being has a substantial but incomplete bundle of legal incidents.",
        ],
      };
    }

    if (score >= 2) {
      return {
        label: "Minimal Legal Subject",
        reasons: [
          "Only a limited legal status is present.",
        ],
      };
    }

    return {
      label: "Legal Nonperson",
      reasons: [
        "The core legal incidents associated with personhood are absent or extremely weak.",
      ],
    };
  }

  function classifyRecognition(r) {
    const score =
      r.can_express + r.expression_understood + r.expression_recognized;

    if (score === 6) {
      return {
        label: "Recognized Person",
        reasons: [
          "Expression is possible.",
          "That expression is understood as meaningful.",
          "The system allows it to count.",
        ],
      };
    }

    if (score >= 3) {
      return {
        label: "Conditionally Recognized",
        reasons: [
          "Expression or recognition is partial, unstable, or platform-dependent.",
        ],
      };
    }

    if (score >= 1) {
      return {
        label: "Blocked from Recognition",
        reasons: [
          "There may be some capacity present, but expression or recognition is blocked.",
        ],
      };
    }

    return {
      label: "Non-recognized Entity",
      reasons: [
        "Expression is absent, not understood, or disallowed from counting.",
      ],
    };
  }

  function getContradictionHighlights(frameworkResults, recognitionResult) {
  const highlights = [];

  const locke = frameworkResults.locke.label;
  const benveniste = frameworkResults.benveniste.label;
  const arendt = frameworkResults.arendt.label;
  const kurki = frameworkResults.kurki.label;
  const recognition = recognitionResult.label;

  const personLikeLabels = [
    "Psychological Person",
    "Linguistic Person",
    "Political Person",
    "Full Legal Person",
    "Partial Legal Person",
  ];

  const weakOrExcludedLabels = [
    "Non-person",
    "Non-subject",
    "Rightless",
    "Legal Nonperson",
  ];

  const strongPersons = Object.entries(frameworkResults)
    .filter(([, value]) => personLikeLabels.includes(value.label))
    .map(([key]) => key);

  const weakOrExcluded = Object.entries(frameworkResults)
    .filter(([, value]) => weakOrExcludedLabels.includes(value.label))
    .map(([key]) => key);

  if (strongPersons.length > 0 && recognition !== "Recognized Person") {
    highlights.push(
      "At least one framework classifies this being as a person, but recognition remains blocked, partial, or unstable."
    );
  }

  if (locke === "Non-person" && kurki === "Full Legal Person") {
    highlights.push(
      "This being may fail as a psychological person while still fully qualifying as a legal person."
    );
  }

  if (locke === "Non-person" && kurki === "Partial Legal Person") {
    highlights.push(
      "This being has some legal personhood even though it does not qualify as a psychological person under Locke."
    );
  }

  if (locke === "Psychological Person" && arendt === "Rightless") {
    highlights.push(
      "Psychological personhood does not guarantee political recognition or the right to have rights."
    );
  }

  if (benveniste === "Linguistic Person" && arendt === "Rightless") {
    highlights.push(
      "This being can count as a speaking subject while remaining politically rightless."
    );
  }

  if (
    kurki === "Full Legal Person" &&
    (locke === "Non-person" || benveniste === "Non-subject")
  ) {
    highlights.push(
      "Legal personhood and philosophical or linguistic personhood do not necessarily align."
    );
  }

  if (
    recognition === "Recognized Person" &&
    weakOrExcluded.length >= 2
  ) {
    highlights.push(
      "This being is recognized by the system even though multiple frameworks classify it weakly or exclude it."
    );
  }

  if (
    strongPersons.length >= 2 &&
    recognition === "Recognized Person"
  ) {
    highlights.push(
      "In this case, several frameworks and the recognition layer reinforce one another."
    );
  }

  if (
    weakOrExcluded.length >= 3 &&
    recognition !== "Recognized Person"
  ) {
    highlights.push(
      "Most frameworks classify this being weakly or exclude it, and the recognition layer is also limited."
    );
  }

  if (highlights.length === 0) {
    highlights.push(
      "This case shows a mixed relationship between psychological, linguistic, political, legal, and recognition-based personhood."
    );
  }

  return highlights;
}

  const universalReady = allUniversalAnswered(responses);
  const gateReady = allGateAnswered(responses);

  const frameworkResults = universalReady
    ? {
        locke: classifyLocke(responses),
        benveniste: classifyBenveniste(responses),
        arendt: classifyArendt(responses),
        kurki: classifyKurki(responses),
      }
    : null;

  const recognitionResult = gateReady ? classifyRecognition(responses) : null;

  const contradictionHighlights =
    frameworkResults && recognitionResult
      ? getContradictionHighlights(frameworkResults, recognitionResult)
      : [];

  function renderScaleButtons(key, currentValue) {
    return (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {SCALE_OPTIONS.map((option) => (
          <button
            key={option.label}
            onClick={() => updateResponse(key, option.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border:
                currentValue === option.value
                  ? "2px solid white"
                  : "1px solid gray",
              background:
                currentValue === option.value ? "#333" : "#222",
              color: "white",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  function renderGateButtons(key, currentValue) {
    return (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {GATE_OPTIONS.map((option) => (
          <button
            key={option.label}
            onClick={() => updateResponse(key, option.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border:
                currentValue === option.value
                  ? "2px solid white"
                  : "1px solid gray",
              background:
                currentValue === option.value ? "#333" : "#222",
              color: "white",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
        fontFamily: "system-ui",
        maxWidth: 980,
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Personhood Classifier</h1>

      <p style={{ marginTop: 0, marginBottom: 8, color: "#bdbdbd" }}>
        Created by Jai Mangal
      </p>

      <p style={{ marginBottom: 32, color: "#d0d0d0" }}>
        This tool asks one shared set of questions, then compares how different
        theories of personhood classify the same being.
      </p>

      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => setDocumentationOpen((prev) => !prev)}
          style={{
            padding: "10px 16px",
            fontSize: 16,
            cursor: "pointer",
            border: "1px solid gray",
            borderRadius: 8,
            background: "#222",
            color: "white",
          }}
        >
          {documentationOpen ? "Close Documentation" : "Open Documentation"}
        </button>
      </div>

      {documentationOpen && (
        <div
          style={{
            marginBottom: 40,
            padding: 24,
            borderRadius: 16,
            background: "#1a1a1a",
            border: "1px solid #333",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Project Documentation</h2>

          <div style={{ marginTop: 24 }}>
            <h3>1. Project Exigence</h3>
            <p>
              The personhood classifier was built on one of the main questions
              central to my anthropology class, “Verifying You Are Human”: what
              makes someone, or something, count as a person? As explored in
              the class, personhood is not something biologically inherited but
              instead a term dependent on varying systems of recognition. A few
              of these systems are: consciousness, language, law, or politics.
            </p>
            <p>
              The point of this tool is not to give one objective answer to our
              question of personhood. Instead, it’s meant to show how the same
              being can be reclassified and interpreted differently under
              different frameworks. A stateless refugee, a corporation, a
              chatbot, a chimpanzee, and a fetus might appear differently based
              on what framework it's considered in.
            </p>
            <p>
              It’s important to recognize these discrepancies because these
              systems, which verify personhood, also have the power to exclude
              those from having said personhood. A being might have memory,
              language, or legal status, but still fail to be recognized as a
              person in another framework. My project, therefore, does not just
              ask what a person is, but also who gets to count as one.
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>2. How the Classifications Were Built</h3>
            <p>
              The classifier uses one shared question bank and then applies four
              different frameworks to the answers a user fills out. This design
              was picked so that multiple frameworks could be considered
              directly. Instead of asking separate questions relating only to
              Locke, Benveniste, Arendt, and Kurki, the website asks questions
              sharing features in self-reflection, language, rights, political
              status, and legal status.
            </p>
            <p>
              Each answer is scored on a scale from “No” to “Full”. This avoids
              the binary understanding of personhood as simply checking “yes” or
              “no” categories. This distinction is necessary as several of the
              readings acknowledge that personhood is not considered in a vacuum,
              and it can be partial, unstable, or dependent on external context.
              For example, Kukri argues that legal personhood should not be
              considered as one isolated thing, but a bundle of legal incidents,
              rights, duties, and capabilities.
            </p>
            <p>The classifier then produces four framework results at once:</p>
            <ul>
              <li>Locke, which evaluates psychological continuity.</li>
              <li>Benveniste, which evaluates linguistic subjectivity.</li>
              <li>Arendt, which evaluates political recognition.</li>
              <li>Kruki, which evaluates legal personhood.</li>
            </ul>
            <p>
              There is also a separate expression gate that references whether
              or not the being can even make recognized expressions. This is
              shown through questions on whether the being can express itself,
              whether the expression is treated as meaningful, and whether the
              system even allows it to count as expression. This layer in the
              classifier is necessary because personhood is not just about
              retaining certain qualities, but also whether those qualities can
              even be expressed and recognized.
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>3. Framework Logic</h3>

            <h4>Locke: Psychological Personhood</h4>
            <p>
              Locke’s framework is centered around consciousness, reflection,
              memory, and continuity of self. In “Of Identity and Diversity,”
              Locke distinguishes between a human body and a person. A person,
              as he defines, is not simply a biological feat, but a conscious
              being that can understand itself as the same thinking being across
              time. In line with this, the classifier’s section on Locke has
              questions pertaining to self-reflection, continuity across time,
              and connection to past experiences.
            </p>

            <h4>Benveniste: Linguistic Personhood</h4>
            <p>
              Benveniste’s framework focuses on the subjectivity in language. In
              “Subjectivity in Language,” he argues that the self emerges
              through language, and especially through the ability to say and
              reference “I”. It is also important that the being is able to enter
              reciprocal relations such as promises that engage with a “you.” For
              this, the classifier has a section of questions which asks whether
              a being can meaningfully become an “I,” participate in reciprocal
              language, and can be treated as a speaking subject.
            </p>

            <h4>Arendt: Political Personhood</h4>
            <p>
              Arendt’s framework focuses on the rights, protections, and
              political belongingness of people. In her discussion of
              statelessness, she illustrates that people can lose the protection
              of rights when they lose citizenship in political communities. A
              person can be a human and still become rightless if no government
              recognizes or protects them. Thus, the classifier contains
              questions pertaining to state recognition, claiming rights, and
              security of belonging within political systems.
            </p>

            <h4>Kurki: Legal Personhood</h4>
            <p>
              Kurki’s framework focuses on legal personhood as a collection
              rather than as a singularity. Legal personhood is not just about
              having a specific right or duty, but involves a cluster of legal
              incidents, which can involve legal standing, representation,
              liability, and the ability to appear in law. So to encapsulate
              this idea, the classifier asks whether the being has legal
              capacities, if it can appear as a claimant or victim, or if the law
              even considers it as more than an object.
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>4. Notes on Interpretation</h3>
            <p>
              The results from the classifier are meant to be interpretive and
              not a final ruling. The classifier does not prove whether or not a
              being is a person. Instead, it only models how different theories
              claim personhood differently.
            </p>
            <p>
              The lesson here is that personhood can be split apart across
              frameworks. A being might be a psychological person under Locke,
              yet completely rightless under Arendt. A corporation may fail as a
              psychological person but count as a legal person under Kurki. A
              chatbot may imitate linguistic subjectivity yet receive no
              political or legal recognition.
            </p>
            <p>
              The project’s goal is to highlight these tensions. It shows that
              personhood is not internally inherent, yet something that is
              produced whether through language, memory, law, politics, or other
              newcoming systems of recognition.
            </p>
          </div>
        </div>
      )}

      <h2>Step 1: Choose Mode</h2>

      <div
        style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}
      >
        <button
          onClick={() => {
            setMode("self");
            resetAll();
          }}
          style={{
            padding: "10px 16px",
            fontSize: 16,
            cursor: "pointer",
            border: mode === "self" ? "2px solid white" : "1px solid gray",
            borderRadius: 8,
            background: mode === "self" ? "#333" : "#222",
            color: "white",
          }}
        >
          Answer as Yourself
        </button>

        <button
          onClick={() => {
            setMode("preset");
            resetAll();
          }}
          style={{
            padding: "10px 16px",
            fontSize: 16,
            cursor: "pointer",
            border: mode === "preset" ? "2px solid white" : "1px solid gray",
            borderRadius: 8,
            background: mode === "preset" ? "#333" : "#222",
            color: "white",
          }}
        >
          Use a Preset Entity
        </button>
      </div>

      {mode === "preset" && (
        <div style={{ marginTop: 40 }}>
          <h2>Step 2: Choose a Preset</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                style={{
                  padding: "10px 16px",
                  fontSize: 16,
                  cursor: "pointer",
                  border:
                    selectedPreset === key
                      ? "2px solid white"
                      : "1px solid gray",
                  borderRadius: 8,
                  background: selectedPreset === key ? "#333" : "#222",
                  color: "white",
                  textAlign: "left",
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPreset && (
        <p style={{ marginTop: 20 }}>
          <strong>Selected preset:</strong> {PRESETS[selectedPreset].label}
        </p>
      )}

      {mode && (
        <div style={{ marginTop: 40 }}>
          <h2>Step {mode === "preset" ? "3" : "2"}: Universal Questionnaire</h2>
          <p>
            Answer these shared questions first. Each framework will then
            interpret the same answer set differently.
          </p>

          <div style={{ marginTop: 24 }}>
            <h3>A. Selfhood and Continuity</h3>

            <div style={{ marginBottom: 24 }}>
              <p>1. Can this being reflect on itself as itself?</p>
              {renderScaleButtons("self_reflection", responses.self_reflection)}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>2. Can it experience itself as the same being across time?</p>
              {renderScaleButtons(
                "continuity_across_time",
                responses.continuity_across_time
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>3. Can it connect present consciousness to past experience?</p>
              {renderScaleButtons("memory_link", responses.memory_link)}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>B. Discursive Subjectivity</h3>

            <div style={{ marginBottom: 24 }}>
              <p>4. Can this being meaningfully say “I”?</p>
              {renderScaleButtons("meaningful_I", responses.meaningful_I)}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>
                5. Can it enter a reciprocal I/you relation, rather than only
                produce output?
              </p>
              {renderScaleButtons(
                "reciprocal_dialogue",
                responses.reciprocal_dialogue
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>
                6. Is its communication treated as discourse in a present
                exchange, rather than just signals or output?
              </p>
              {renderScaleButtons(
                "discourse_presence",
                responses.discourse_presence
              )}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>C. Political Belonging and Rightlessness</h3>

            <div style={{ marginBottom: 24 }}>
              <p>
                7. Is this being recognized and protected by a government or
                political order?
              </p>
              {renderScaleButtons(
                "state_recognition",
                responses.state_recognition
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>8. Can it actually claim rights in practice?</p>
              {renderScaleButtons(
                "rights_in_practice",
                responses.rights_in_practice
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>
                9. Does it have a secure place within a legal-political
                community, rather than existing in exception, lawlessness, or
                dispossession?
              </p>
              {renderScaleButtons(
                "political_belonging",
                responses.political_belonging
              )}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>D. Legal Incidents and Capacities</h3>

            <div style={{ marginBottom: 24 }}>
              <p>
                10. Does the law protect this being’s basic interests as more
                than a mere object or thing?
              </p>
              {renderScaleButtons(
                "protected_not_thing",
                responses.protected_not_thing
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>
                11. Can it hold or exercise major legal capacities, such as
                owning property, entering agreements, or being represented in
                law?
              </p>
              {renderScaleButtons(
                "legal_capacities",
                responses.legal_capacities
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p>
                12. Can it appear in law as a claimant, victim, duty-bearer, or
                rights-holder?
              </p>
              {renderScaleButtons("legal_presence", responses.legal_presence)}
            </div>
          </div>
        </div>
      )}

      {mode && (
        <div style={{ marginTop: 40 }}>
          <h2>Step {mode === "preset" ? "4" : "3"}: Expression Gate</h2>

          <div style={{ marginBottom: 24 }}>
            <p>1. Can this being express itself in a perceivable way?</p>
            {renderGateButtons("can_express", responses.can_express)}
          </div>

          <div style={{ marginBottom: 24 }}>
            <p>2. Is that expression treated as meaningful by others?</p>
            {renderGateButtons(
              "expression_understood",
              responses.expression_understood
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <p>3. Does the system or platform allow that expression to count?</p>
            {renderGateButtons(
              "expression_recognized",
              responses.expression_recognized
            )}
          </div>
        </div>
      )}

      {frameworkResults && recognitionResult && (
        <div
          style={{
            marginTop: 50,
            padding: 28,
            borderRadius: 16,
            background: "#1a1a1a",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            border: "1px solid #333",
          }}
        >
          <h2 style={{ marginBottom: 20 }}>Results</h2>

          <div style={{ marginBottom: 28 }}>
            <h3>Framework Classifications</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 12,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid gray",
                      paddingBottom: 8,
                    }}
                  >
                    Framework
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid gray",
                      paddingBottom: 8,
                    }}
                  >
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ paddingTop: 10 }}>Locke</td>
                  <td style={{ paddingTop: 10 }}>{frameworkResults.locke.label}</td>
                </tr>
                <tr>
                  <td style={{ paddingTop: 10 }}>Benveniste</td>
                  <td style={{ paddingTop: 10 }}>
                    {frameworkResults.benveniste.label}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: 10 }}>Arendt</td>
                  <td style={{ paddingTop: 10 }}>{frameworkResults.arendt.label}</td>
                </tr>
                <tr>
                  <td style={{ paddingTop: 10 }}>Kurki</td>
                  <td style={{ paddingTop: 10 }}>{frameworkResults.kurki.label}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h3>Recognition Layer</h3>
            <p>
              <span style={{ fontSize: 18, fontWeight: "bold" }}>
                {recognitionResult.label}
              </span>
            </p>
            <ul>
              {recognitionResult.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h3>Framework Notes</h3>

            <p>
              <strong>Locke:</strong> {frameworkResults.locke.reasons[0]}
            </p>
            <p>
              <strong>Benveniste:</strong> {frameworkResults.benveniste.reasons[0]}
            </p>
            <p>
              <strong>Arendt:</strong> {frameworkResults.arendt.reasons[0]}
            </p>
            <p>
              <strong>Kurki:</strong> {frameworkResults.kurki.reasons[0]}
            </p>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3>Tensions & Contradictions</h3>
            <ul>
              {contradictionHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}