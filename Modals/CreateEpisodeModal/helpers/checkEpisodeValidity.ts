import {
  IEpisode,
  IIntervetion,
  IJustificationType,
  ISegment,
  ISegmentEstimativeType,
  ISegmentIntensities,
  ISegmentPainType,
  ISegmentQuality,
  ISegmentTimeUnit,
  ISymptom,
  ImportEpisodeStructure,
} from "types";

type EpisodeData = {
  name: string;
  location?: string;
  diagnosis?: string;
  start_date?: string;
  comment?: string;
};

const checkEpisode = (episodeOnly: EpisodeData) => {
  const { name, location, diagnosis, start_date, comment } = episodeOnly;

  if (!name) {
    return {
      path: "episode.name",
      message: "Name is required",
    };
  }

  if (start_date) {
    const date = new Date(start_date);
    if (!date.getTime()) {
      return {
        path: "episode.start_date",
        message: "Start date is invalid",
      };
    }
  }

  return null;
};

type TrackData = {
  name: string;
  pain_type: string;
  comment?: string;
};

const checkTrack = (track: TrackData) => {
  const { name, pain_type, comment } = track;

  if (!name) {
    return {
      path: "track.name",
      message: "Name is required",
    };
  }

  if (pain_type) {
    if (pain_type !== "psychological" && pain_type !== "physical") {
      return {
        path: "track.pain_type",
        message: "Pain type is invalid: must be 'psychological' or 'physical'",
      };
    }
  }

  return null;
};

type SegmentData = {
  estimative_type: ISegmentEstimativeType;
  start_date?: string;
  end?: number;
  start?: number;
  intensities: ISegmentIntensities;
  comment?: string;
  interventions: IIntervetion[];
  pain_type: ISegmentPainType;
  symptoms: ISymptom[];
  time_unit?: ISegmentTimeUnit;
  name?: string;
  quality?: ISegmentQuality;
};

const checkSegment = (segment: SegmentData) => {
  const {
    estimative_type,
    start_date,
    end,
    start,
    pain_type,
    quality,
    comment,
    symptoms,
    interventions,
    time_unit,
    name,
    intensities,
  } = segment;

  if (estimative_type) {
    if (
      estimative_type !== "inferred" &&
      estimative_type !== "measured" &&
      estimative_type !== "reported"
    ) {
      return {
        path: "segment.estimative_type",
        message:
          "Estimative type is invalid: must be 'inferred', 'measured' or 'reported'",
      };
    }
  }

  if (start_date) {
    const date = new Date(start_date);
    if (!date.getTime()) {
      return {
        path: "segment.start_date",
        message: "Start date is invalid",
      };
    }
  }

  if (end) {
    if (end < 0) {
      return {
        path: "segment.end",
        message: "End must be greater than zero",
      };
    }
  }

  if (start) {
    if (start < 0) {
      return {
        path: "segment.start",
        message: "Start must be greater than zero",
      };
    }
  }

  if (start && end) {
    if (start > end) {
      return {
        path: "segment.start",
        message: "Start must be less than end",
      };
    }
  }

  if (pain_type) {
    if (pain_type !== "acute" && pain_type !== "chronic") {
      return {
        path: "segment.pain_type",
        message: "Pain type is invalid: must be 'acute' or 'chronic'",
      };
    }
  }

  if (quality) {
    if (quality.texture) {
      const allTextures: ISegmentQuality["texture"][] = [
        "burning",
        "pressing",
        "stinging",
        "stretching",
      ];

      if (!allTextures.includes(quality.texture)) {
        return {
          path: "segment.quality.texture",
          message:
            "Texture is invalid: must be 'burning', 'pressing', 'stinging' or 'stretching'",
        };
      }
    }
    if (quality.depth) {
      const allDepths: ISegmentQuality["depth"][] = [
        "muscular",
        "bone",
        "superficial",
        "visceral",
      ];

      if (!allDepths.includes(quality.depth)) {
        return {
          path: "segment.quality.depth",
          message:
            "Depth is invalid: must be 'muscular', 'bone', 'superficial' or 'visceral'",
        };
      }
    }

    if (quality.comment) {
      if (typeof quality.comment !== "string") {
        return {
          path: "segment.quality.comment",
          message: "Comment must be a string",
        };
      }
    }

    if (quality.anatomy) {
      if (typeof quality.anatomy !== "string") {
        return {
          path: "segment.quality.anatomy",
          message: "Anatomy must be a string",
        };
      }
    }
  }

  if (comment) {
    if (typeof comment !== "string") {
      return {
        path: "segment.comment",
        message: "Comment must be a string",
      };
    }
  }
};

type JustificationData = {
  description?: string;
  ranking: {
    excruciating?: number;
    disabling?: number;
    hurful?: number;
    annoying?: number;
    no_pain?: number;
  };
  sources?: string;
  title: string;
  type_of_evidence?: IJustificationType;
};

const checkJustification = (justification: JustificationData) => {
  const { description, ranking, sources, title, type_of_evidence } =
    justification;

  if (description) {
    if (typeof description !== "string") {
      return {
        path: "justification.description",
        message: "Description must be a string",
      };
    }
  }

  if (ranking) {
    if (typeof ranking !== "object") {
      return {
        path: "justification.ranking",
        message: "Ranking must be an object",
      };
    }

    if (ranking.excruciating) {
      if (typeof ranking.excruciating !== "number") {
        return {
          path: "justification.ranking.excruciating",
          message: "Excruciating must be a number",
        };
      }
      if (ranking.excruciating < 0 || ranking.excruciating > 4) {
        return {
          path: "justification.ranking.excruciating",
          message: "Excruciating must be between 0 and 4",
        };
      }
    }

    if (ranking.disabling) {
      if (typeof ranking.disabling !== "number") {
        return {
          path: "justification.ranking.disabling",
          message: "Disabling must be a number",
        };
      }

      if (ranking.disabling < 0 || ranking.disabling > 4) {
        return {
          path: "justification.ranking.disabling",
          message: "Disabling must be between 0 and 4",
        };
      }
    }

    if (ranking.hurful) {
      if (typeof ranking.hurful !== "number") {
        return {
          path: "justification.ranking.hurful",
          message: "Hurful must be a number",
        };
      }

      if (ranking.hurful < 0 || ranking.hurful > 4) {
        return {
          path: "justification.ranking.hurful",
          message: "Hurful must be between 0 and 4",
        };
      }
    }

    if (ranking.annoying) {
      if (typeof ranking.annoying !== "number") {
        return {
          path: "justification.ranking.annoying",
          message: "Annoying must be a number",
        };
      }

      if (ranking.annoying < 0 || ranking.annoying > 4) {
        return {
          path: "justification.ranking.annoying",
          message: "Annoying must be between 0 and 4",
        };
      }
    }

    if (ranking.no_pain) {
      if (typeof ranking.no_pain !== "number") {
        return {
          path: "justification.ranking.no_pain",
          message: "No pain must be a number",
        };
      }

      if (ranking.no_pain < 0 || ranking.no_pain > 4) {
        return {
          path: "justification.ranking.no_pain",
          message: "No pain must be between 0 and 4",
        };
      }
    }
  }

  if (sources) {
    if (typeof sources !== "string") {
      return {
        path: "justification.sources",
        message: "Sources must be a string",
      };
    }
  }

  if (title) {
    if (typeof title !== "string") {
      return {
        path: "justification.title",
        message: "Title must be a string",
      };
    }
  }

  if (type_of_evidence) {
    const allTypes: IJustificationType[] = [
      "behavioral",
      "neurological",
      "pharmacological",
      "physiological",
    ];

    if (!allTypes.includes(type_of_evidence)) {
      return {
        path: "justification.type_of_evidence",
        message:
          "Type of evidence is invalid: must be 'behavioral', 'neurological', 'pharmacological' or 'physiological'",
      };
    }
  }
};

export const checkValidity = (episode: ImportEpisodeStructure) => {
  const episodeData: EpisodeData = {
    name: episode.name,
    location: episode.location,
    diagnosis: episode.diagnosis,
    start_date: episode.start_date,
    comment: episode.comment,
  };

  const episodeError = checkEpisode(episodeData);

  if (episodeError) {
    return episodeError;
  }

  const tracks = episode.tracks;
  if (tracks) {
    for (const track of tracks) {
      const trackData: TrackData = {
        name: track.name,
        pain_type: track.pain_type || "physical",
        comment: track.comment,
      };

      const trackError = checkTrack(trackData);

      if (trackError) {
        return trackError;
      }

      const segments = track.segments;

      if (segments) {
        for (const segment of segments) {
          const segmentData: SegmentData = {
            estimative_type: segment.estimative_type,
            start_date: segment.start_date?.toString(),
            end: segment.end,
            start: segment.start,
            intensities: segment.intensities,
            comment: segment.comment,
            interventions: segment.interventions,
            pain_type: segment.pain_type,
            symptoms: segment.symptoms,
            time_unit: segment.time_unit,
            name: segment.name,
            quality: segment.quality,
          };

          const segmentError = checkSegment(segmentData);

          if (segmentError) {
            return {
              track: track.name,
              ...segmentError,
            };
          }

          const justifications = segment.justifications;

          if (justifications) {
            for (const justification of justifications) {
              const justificationData: JustificationData = {
                description: justification.description,
                ranking: justification.ranking,
                sources: justification.sources,
                title: justification.title,
                type_of_evidence: justification.type_of_evidence,
              };
            }
          }
        }
      }
    }
  }
};
