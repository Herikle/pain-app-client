import { PainType } from "@utils/helpers/segmentHelpers";

export const PAIN_DEFITIONS: { [key in PainType]: string } = {
  excruciating:
    "All conditions and events associated with extreme levels of pain that are not normally tolerated even if only for a few seconds. In humans, it would mark the threshold of pain under which many people choose to take their lives rather than endure the pain. This is the case, for example, of scalding and severe burning events. Behavioral patterns associated with experiences in this category may include loud screaming, involuntary shaking, extreme muscle tension, or extreme restlessness. Another criterion is the manifestation of behaviors that individuals would strongly refrain from displaying under normal circumstances, as they threaten body integrity (e.g. running into hazardous areas or exposing oneself to sources of danger, such as predators, as a result of pain or of attempts to alleviate it). The attribution of conditions to this level must therefore be done cautiously. Concealment of pain is not possible.",
  disabling:
    "Pain at this level takes priority over most bids for behavioral execution and prevents most forms of enjoyment or positive welfare. Pain is continuously distressing. Individuals affected by harms in this category often change their activity levels drastically (the degree of disruption in the ability of an organism to function optimally should not be confused with the overt expression of pain behaviors, which is less likely in prey species). Inattention and unresponsiveness to milder forms of pain or other ongoing stimuli and surroundings is likely to be observed. Relief often requires higher drug dosages or more powerful drugs. The term Disabling refers to the disability caused by ‘pain’, not to any structural disability.",
  hurful:
    "Experiences of pain in this category disrupt the ability of individuals to function optimally. Different from Annoying pain, the ability to draw attention away from the sensation of pain is reduced: awareness of pain is likely to be present most of the time, interspersed by brief periods during which pain can be ignored depending on the level of distraction provided by other activities. Individuals can still conduct routine activities that are important in the short-term (e.g. eating, foraging) and perform cognitively demanding tasks, but an impairment in their ability or motivation to do so is likely to be observed. Although animals may still engage in behaviors they are strongly motivated to perform (i.e., exploratory, comfort, sexual, and maintenance behaviors), their frequency or duration is likely to be reduced. Engagement in positive activities with no immediate benefits (e.g., play in piglets, dustbathing in chickens) is not expected. Reduced alertness and inattention to ongoing stimuli may be present. The effect of (effective) drugs (e.g., analgesics if the pain is physical, psychotropic drugs in the case of psychological pain) in the alleviation of symptoms is expected.",
  annoying:
    "Experiences of pain perceived as aversive, but not intense enough to disrupt the animal’s routine in a way that alters adaptive functioning or affects the behaviors that animals are motivated to perform. Similarly, Annoying pain should not deter individuals from enjoying pleasant experiences with no short-term function (e.g., play) and positive social interactions. Sufferers can ignore this sensation most of the time. Performance of cognitive tasks demanding attention are either not affected or only mildly affected. Physiological departures from expected baseline values are not expected to be present. Vocalizations and other overt expressions of pain should not be observed",
  no_pain: "",
} as const;
