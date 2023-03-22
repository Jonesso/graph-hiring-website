export enum RelationType {
  WorksWith = 'COWORKERS',
  StudiedWith = 'CLASSMATES',
  Teammates = 'TEAMMATES',
  Supervised = 'SUPERVISED',
  SubordinateTo = 'SUBORDINATE_TO',
}

export const OppositeRelationType = Object.freeze({
  [RelationType.WorksWith]: RelationType.WorksWith,
  [RelationType.StudiedWith]: RelationType.StudiedWith,
  [RelationType.Teammates]: RelationType.Teammates,

  [RelationType.Supervised]: RelationType.SubordinateTo,
  [RelationType.SubordinateTo]: RelationType.Supervised,
});

export const isBidirectional = (type: RelationType) => OppositeRelationType[type] === type;
